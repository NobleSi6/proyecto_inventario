// src/reports/reports.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleSalida } from './entities/DetalleSalida.entity'; // Entidad clave
import { Material } from './entities/Material.entity'; // Para el nombre
import { Salida } from './entities/SalidasInventario.entity'; // Para los filtros de proyecto/fecha
import { TopProductsDto } from './dto/top-products.dto'; // DTO con los filtros

@Injectable()
export class ReportsService {
    constructor(
        // Inyectamos el repositorio del detalle, que contiene la cantidad usada
        @InjectRepository(DetalleSalida)
        private detalleSalidaRepository: Repository<DetalleSalida>,
        @InjectRepository(Salida)
        private salidasRepository: Repository<Salida>, // Usado para vincular con Proyecto/Fecha
    ) {}

    async getTopProducts(dto: TopProductsDto) {
        const { startDate, endDate, projectId, limit = 5 } = dto;

        // 1. Iniciar la consulta desde detalle_salida
        const query = this.detalleSalidaRepository
            .createQueryBuilder('detalle')
            .innerJoin(Material, 'material', 'detalle.id_material = material.id_material') // Unir con Materiales para el nombre
            // Necesitamos unir con salidas_inventario para los filtros de fecha/proyecto
            .innerJoin(Salida, 'salida', 'detalle.id_salida = salida.id_salida')
            
            // 2. Seleccionar las columnas agrupadas y sumadas
            .select('material.id_material', 'materialId')
            .addSelect('material.nombre', 'materialName')
            .addSelect('SUM(detalle.cantidad)', 'totalUsed')
            
            // 3. Aplicar filtros
            .where('detalle.activo = true'); // Asumiendo que solo materiales activos son relevantes

        if (startDate) {
            // Filtrar por la fecha de la salida (fecha_salida en salidas_inventario)
            query.andWhere('salida.fecha_salida >= :startDate', { startDate });
        }
        if (endDate) {
            query.andWhere('salida.fecha_salida <= :endDate', { endDate });
        }
        if (projectId) {
            // Filtrar por el proyecto de la salida
            query.andWhere('salida.id_proyecto = :projectId', { projectId });
        }

        // 4. Agrupar y Ordenar
        query
            .groupBy('material.id_material, material.nombre')
            .orderBy('totalUsed', 'DESC')
            .limit(limit);

        return query.getRawMany();
    }
}