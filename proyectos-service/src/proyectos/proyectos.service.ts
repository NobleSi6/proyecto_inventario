// proyectos-service/src/proyectos/proyectos.service.ts
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Proyecto } from './entities/proyecto.entity';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';

@Injectable()
export class ProyectosService {
  private readonly backendUrl: string;
  private readonly configuracionUrl: string;

  constructor(
    @InjectRepository(Proyecto)
    private proyectosRepository: Repository<Proyecto>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.backendUrl = this.configService.get('BACKEND_URL', 'http://localhost:3000');
    this.configuracionUrl = this.configService.get('CONFIGURACION_URL', 'http://localhost:3003');
    
    // Log para debugging
    console.log('🔗 Backend URL:', this.backendUrl);
    console.log('🔗 Configuración URL:', this.configuracionUrl);
  }

  async create(createProyectoDto: CreateProyectoDto) {
    try {
      // Verificar que el estado existe
      await this.verificarEstado(createProyectoDto.estado);
      
      const proyecto = this.proyectosRepository.create(createProyectoDto);
      const saved = await this.proyectosRepository.save(proyecto);
      
      console.log('✅ Proyecto creado:', saved.id_proyecto);
      return saved;
    } catch (error) {
      console.error('❌ Error al crear proyecto:', error.message);
      throw error;
    }
  }

  async findAll(activo?: boolean) {
    try {
      console.log('🔍 Buscando proyectos, activo:', activo);
      
      const queryBuilder = this.proyectosRepository.createQueryBuilder('proyecto');
      
      if (activo !== undefined) {
        queryBuilder.where('proyecto.activo = :activo', { activo });
      }
      
      const proyectos = await queryBuilder
        .orderBy('proyecto.fecha_creacion', 'DESC')
        .getMany();
      
      console.log(`✅ Encontrados ${proyectos.length} proyectos`);
      return proyectos;
    } catch (error) {
      console.error('❌ Error al buscar proyectos:', error.message);
      throw new InternalServerErrorException('Error al buscar proyectos');
    }
  }

  async findOne(id: number) {
    try {
      console.log('🔍 Buscando proyecto ID:', id);
      
      const proyecto = await this.proyectosRepository.findOne({ 
        where: { id_proyecto: id } 
      });
      
      if (!proyecto) {
        throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
      }
      
      console.log('✅ Proyecto encontrado:', proyecto.nombre);
      return proyecto;
    } catch (error) {
      console.error('❌ Error al buscar proyecto:', error.message);
      throw error;
    }
  }

  async getSalidasPorProyecto(idProyecto: number) {
    try {
      console.log('🔍 Buscando salidas para proyecto:', idProyecto);
      
      const response = await firstValueFrom(
        this.httpService.get(`${this.backendUrl}/salidas-inventario`, {
          params: { id_proyecto: idProyecto },
          timeout: 5000,
        })
      );
      
      console.log(`✅ Encontradas ${response.data.length || 0} salidas`);
      return response.data;
    } catch (error) {
      console.error('⚠️ Error al obtener salidas:', error.message);
      return [];
    }
  }

  async getOrdenesCompraPorProyecto(idProyecto: number) {
    try {
      console.log('🔍 Buscando órdenes de compra para proyecto:', idProyecto);
      
      const response = await firstValueFrom(
        this.httpService.get(`${this.backendUrl}/ordenes-compra`, {
          params: { id_proyecto: idProyecto },
          timeout: 5000,
        })
      );
      
      console.log(`✅ Encontradas ${response.data.length || 0} órdenes de compra`);
      return response.data;
    } catch (error) {
      console.error('⚠️ Error al obtener órdenes de compra:', error.message);
      return [];
    }
  }

  async getRecursosUtilizados(idProyecto: number) {
    // Primero verificar que el proyecto existe
    await this.findOne(idProyecto);
    
    const salidas = await this.getSalidasPorProyecto(idProyecto);
    const ordenes = await this.getOrdenesCompraPorProyecto(idProyecto);
    
    return {
      proyecto_id: idProyecto,
      salidas_totales: Array.isArray(salidas) ? salidas.length : 0,
      ordenes_compra_totales: Array.isArray(ordenes) ? ordenes.length : 0,
      salidas: salidas,
      ordenes_compra: ordenes,
    };
  }

  async update(id: number, updateProyectoDto: UpdateProyectoDto) {
    try {
      const proyecto = await this.findOne(id);
      
      if (updateProyectoDto.estado) {
        await this.verificarEstado(updateProyectoDto.estado);
      }
      
      Object.assign(proyecto, updateProyectoDto);
      const updated = await this.proyectosRepository.save(proyecto);
      
      console.log('✅ Proyecto actualizado:', updated.id_proyecto);
      return updated;
    } catch (error) {
      console.error('❌ Error al actualizar proyecto:', error.message);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const proyecto = await this.findOne(id);
      proyecto.activo = false;
      const updated = await this.proyectosRepository.save(proyecto);
      
      console.log('✅ Proyecto desactivado:', updated.id_proyecto);
      return updated;
    } catch (error) {
      console.error('❌ Error al desactivar proyecto:', error.message);
      throw error;
    }
  }

  private async verificarEstado(idEstado: number) {
    try {
      await firstValueFrom(
        this.httpService.get(`${this.configuracionUrl}/api/estados/${idEstado}`, {
          timeout: 5000,
        })
      );
      console.log('✅ Estado verificado:', idEstado);
    } catch (error) {
      console.error('⚠️ No se pudo verificar estado:', error.message);
      throw new NotFoundException(`Estado con ID ${idEstado} no encontrado o servicio no disponible`);
    }
  }

  // Método para debug - ver si hay conexión a BD
  async testConnection() {
    try {
      const count = await this.proyectosRepository.count();
      console.log('✅ Conexión a BD OK. Total proyectos:', count);
      return { connected: true, count };
    } catch (error) {
      console.error('❌ Error de conexión a BD:', error.message);
      return { connected: false, error: error.message };
    }
  }
}