// src/warehousing-core/warehousing-core.service.ts
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ProcessMovementDto } from './dto/process-movement.dto';
import { CreateTransferRequestDto } from './dto/create-transfer-request.dto'; // DTO para iniciar transferencia

@Injectable()
export class WarehousingCoreService {
  constructor(private readonly httpService: HttpService) {}

  // =========================================================================
  // 1. CONTROL DE EXISTENCIAS (LECTURA)
  // =========================================================================

  async getStock(id_almacen: number, id_material: number) {
    // La forma más fácil es buscar el registro único por la clave compuesta.
    // Asumimos que el backend tiene un endpoint para esto, o filtramos el findAll.
    try {
        const url = `/stock-almacen`;
        const response = await lastValueFrom(
            this.httpService.get(url, {
                params: { 
                    id_almacen, 
                    id_material 
                }
            })
        );
        const stockItem = response.data?.data?.[0];

        if (!stockItem) {
            return { id_almacen, id_material, cantidad_disponible: 0, cantidad_reservada: 0 };
        }
        return stockItem;
    } catch (error) {
        throw new InternalServerErrorException('Error al consultar stock en el servicio backend.');
    }
  }

  // =========================================================================
  // 2. MOVIMIENTOS (ENTRADA/SALIDA) - LÓGICA TRANSACCIONAL
  // =========================================================================

  async processMovement(dto: ProcessMovementDto, type: 'ENTRADA' | 'SALIDA') {
    const { id_material, id_almacen, cantidad, referencia, id_empleado } = dto;

    try {
      // 1. Obtener el stock actual y validar (LECTURA)
      const currentStock = await this.getStock(id_almacen, id_material);
      let stock_id = currentStock.id_stock;
      let new_disponible = currentStock.cantidad_disponible || 0;
      const delta = type === 'ENTRADA' ? cantidad : -cantidad;
      
      new_disponible += delta;

      if (new_disponible < 0) {
        throw new BadRequestException(`Stock insuficiente (${currentStock.cantidad_disponible}) para la ${type} de ${cantidad}.`);
      }

      // 2. ACTUALIZAR STOCK (ESCRITURA 1)
      if (!stock_id) {
        // Si no existe stock y es entrada, creamos el registro
        const createStockDto = { id_almacen, id_material, cantidad_disponible: new_disponible, cantidad_reservada: 0 };
        const res = await lastValueFrom(this.httpService.post('/stock-almacen', createStockDto));
        stock_id = res.data.id_stock;
      } else {
        // Actualizamos el stock existente
        const updateStockDto = { cantidad_disponible: new_disponible };
        await lastValueFrom(this.httpService.patch(`/stock-almacen/${stock_id}`, updateStockDto));
      }
      
      // 3. CREAR HISTORIAL (ESCRITURA 2)
      const createHistoryDto = {
        id_material,
        id_almacen,
        tipo_movimiento: type,
        cantidad,
        stock_anterior: currentStock.cantidad_disponible,
        stock_nuevo: new_disponible,
        referencia,
        id_empleado,
      };
      await lastValueFrom(this.httpService.post('/historial-movimientos', createHistoryDto));

      return { success: true, message: `${type} registrada con éxito.`, newStock: new_disponible };

    } catch (error) {
      // Si falla la escritura del historial o el segundo paso de stock
      // En un entorno real, tendríamos que implementar COMPENSACIÓN aquí:
      // Si falla el paso 3, llamar al PATCH de StockAlmacen para revertir el cambio.

      // Aquí simplificamos el manejo de error y re-lanzamos:
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(`Fallo crítico en la operación de ${type}. Podría haber inconsistencia de stock.`);
    }
  }

  // =========================================================================
  // 3. TRANSFERENCIAS - LÓGICA COMPLEJA (SAGA)
  // =========================================================================
  
  // (Asumiendo que has creado los DTOs para la transferencia compleja)

  async createTransfer(dto: CreateTransferRequestDto) {
    // 1. CREAR ENCABEZADO DE TRANSFERENCIA (PENDIENTE)
    const transferDto = { ...dto, estado: 1 }; // 1 = ESTADO PENDIENTE (asumido)
    const transferRes = await lastValueFrom(this.httpService.post('/transferencias', transferDto));
    const id_transferencia = transferRes.data.id_transferencia;

    // 2. CREAR DETALLES DE TRANSFERENCIA
    const details = dto.items.map(item => ({ ...item, id_transferencia }));
    const bulkDetailsDto = { items: details };
    await lastValueFrom(this.httpService.post('/detalles-transferencia/bulk', bulkDetailsDto));

    return { id_transferencia, status: 'Creada Pendiente' };
  }

  async completeTransfer(id_transferencia: number, id_empleado_receptor: number) {
    // ** ESTA ES LA SAGA CRÍTICA **
    
    // 1. OBTENER INFORMACIÓN NECESARIA
    const transferRes = await lastValueFrom(this.httpService.get(`/transferencias/${id_transferencia}`));
    const transfer = transferRes.data;
    
    const detailsRes = await lastValueFrom(this.httpService.get(`/detalles-transferencia?id_transferencia=${id_transferencia}`));
    const details = detailsRes.data.data;

    // Validaciones (estado, almacenes, etc.)
    if (transfer.estado !== 1) { // 1 = PENDIENTE (asumido)
        throw new BadRequestException('La transferencia no está pendiente de completar.');
    }

    const successfulMovements: { id: number, type: string, oldStock: number }[] = [];

    try {
        // 2. PROCESAR CADA DETALLE (Saga por item)
        for (const detail of details) {
            const { id_material, cantidad, id_detalle_transferencia } = detail;
            const referencia = `TRF-${id_transferencia}`;
            
            // --- MOVIMIENTO DE SALIDA (Origen) ---
            await this.processMovement({
                id_material,
                id_almacen: transfer.id_almacen_origen,
                cantidad,
                referencia,
                id_empleado: id_empleado_receptor, // El que autoriza la salida, o solicitante
            }, 'SALIDA');
            
            // --- MOVIMIENTO DE ENTRADA (Destino) ---
            await this.processMovement({
                id_material,
                id_almacen: transfer.id_almacen_destino,
                cantidad,
                referencia,
                id_empleado: id_empleado_receptor,
            }, 'ENTRADA');

            // 3. ACTUALIZAR CANTIDAD RECIBIDA EN DETALLE_TRANSFERENCIA
            const updateDetailDto = { cantidad_recibida: cantidad };
            await lastValueFrom(this.httpService.patch(`/detalles-transferencia/${id_detalle_transferencia}`, updateDetailDto));
        }
        
        // 4. ACTUALIZAR ESTADO DE TRANSFERENCIA (Finalizar Saga)
        const completeDto = { 
            estado: 2, // 2 = ESTADO COMPLETADO (asumido)
            fecha_recepcion: new Date().toISOString().split('T')[0], // YYYY-MM-DD
            id_empleado_receptor,
        };
        await lastValueFrom(this.httpService.patch(`/transferencias/${id_transferencia}`, completeDto));

        return { success: true, message: `Transferencia ${id_transferencia} completada.` };

    } catch (error) {
        // Si hay error en cualquier paso (stock, historial), se falla y se notifica.
        // En un sistema real, se debería:
        // 1. Marcar la transferencia como 'FALLIDA' (nuevo estado 3).
        // 2. Ejecutar transacciones compensatorias para revertir los movimientos de stock exitosos.
        
        // Aquí re-lanzamos el error.
        throw new InternalServerErrorException(`Fallo al completar la transferencia ${id_transferencia}. El stock podría ser inconsistente.`);
    }
  }
}