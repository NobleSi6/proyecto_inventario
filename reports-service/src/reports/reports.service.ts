// src/reports/reports.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { TopProductsDto } from './dto/top-products.dto';
import { firstValueFrom } from 'rxjs';

// Definición de interfaces de respuesta para tipificar (debes asegurarte que coincidan con la respuesta real)
interface MaterialResponse {
    id_material: number;
    nombre: string;
}

interface SalidaResponse {
    id_salida: number;
    id_proyecto: number;
    fecha_salida: string;
}

interface DetalleSalidaResponse {
    id_detalle_salida: number;
    id_salida: number;
    id_material: number;
    cantidad: number;
}


@Injectable()
export class ReportsService {
    // 🚨 Inyectamos HttpService. La baseURL se obtiene de BACKEND_CRUD_URL en el módulo.
    constructor(private readonly httpService: HttpService) {}

    /**
     * Utilidad para hacer peticiones GET a los endpoints CRUD.
     * Asume que el endpoint puede manejar un 'limit' alto para evitar paginación.
     */
    
private async fetchApi<T>(path: string, params: any = {}): Promise<T[]> {
        try {
            params.activo = 'true'; 
            // 🚨 Subimos el límite para asegurarnos de traer todos los datos necesarios
            params.limit = 10000; 

            const response = await firstValueFrom(
                this.httpService.get(path, { params }),
            );
            
            const responseData = response.data;
            
            // 🚨 CORRECCIÓN CLAVE: Verifica si la respuesta es un objeto con una propiedad 'data' (paginación)
            if (responseData && Array.isArray(responseData.data)) {
                return responseData.data as T[];
            }
            
            // Si no es un objeto paginado, asume que es el array directo
            if (Array.isArray(responseData)) {
                return responseData as T[];
            }

            // Si el formato es inesperado, devuelve un array vacío
            console.warn(`Advertencia: Formato de respuesta inesperado de ${path}.`, responseData);
            return [];
            
        } catch (error) {
            console.error(`Error al obtener datos de ${path}:`, error.response?.data || error.message);
            throw new InternalServerErrorException(`Error al obtener datos de ${path} para el reporte. Ver logs.`);
        }
    }

    async getTopProducts(dto: TopProductsDto): Promise<any[]> {
        const { startDate, endDate, projectId, limit = 5 } = dto;

        // 1. Obtener todas las Salidas filtradas por fecha y proyecto.
        const salidas = await this.fetchApi<SalidaResponse>('/salidas', {
            desde: startDate,       // Filtro de fecha de SalidasController
            hasta: endDate,         // Filtro de fecha de SalidasController
            id_proyecto: projectId, // Filtro de proyecto de SalidasController
        });

        // IDs de salida que cumplen los filtros (fecha/proyecto)
        const salidaIds = new Set(salidas.map(s => s.id_salida));
        
        if (salidaIds.size === 0) {
             return []; // No hay salidas que coincidan con los filtros.
        }

        // 2. Obtener todos los DetallesSalida y Materiales (para la agregación local)
        // 🚨 OBTENEMOS TODOS LOS DETALLES YA QUE EL ENDPOINT NO FILTRA POR UNA LISTA DE IDs.
        const allDetalles = await this.fetchApi<DetalleSalidaResponse>('/detalles-salida');

        // Obtenemos todos los materiales para mapear el nombre del producto
        const allMaterials = await this.fetchApi<MaterialResponse>('/materiales');
        const materialMap = new Map(allMaterials.map(m => [m.id_material, m.nombre]));

        // 3. Filtrar y Agrupar los DetallesSalida (Lógica SUM/GROUP BY en memoria)
        const aggregationMap = new Map<number, { materialName: string, totalUsed: number }>();

        for (const detalle of allDetalles) {
            // Aplicar el filtro de IDs de Salida obtenido en el paso 1
            if (salidaIds.has(detalle.id_salida)) {
                
                const currentTotal = aggregationMap.get(detalle.id_material)?.totalUsed || 0;
                const materialName = materialMap.get(detalle.id_material) || `ID Desconocido (${detalle.id_material})`;

                aggregationMap.set(detalle.id_material, {
                    materialName: materialName,
                    // SUMA local de las cantidades
                    totalUsed: currentTotal + detalle.cantidad, 
                });
            }
        }

        // 4. Formatear, Ordenar y Limitar el resultado
        const results = Array.from(aggregationMap, ([materialId, data]) => ({
            materialId,
            materialName: data.materialName,
            totalUsed: data.totalUsed,
        }))
        .sort((a, b) => b.totalUsed - a.totalUsed) // Ordenar de mayor a menor
        .slice(0, limit); // Aplicar el límite (ej. top 5)

        return results;
    }
}

//nuevo commit