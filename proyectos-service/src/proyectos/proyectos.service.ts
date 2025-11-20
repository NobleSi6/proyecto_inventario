// proyectos-service/src/proyectos/proyectos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
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
  private readonly backendUrl: string | any;
  private readonly configuracionUrl: string | any;

  constructor(
    @InjectRepository(Proyecto)
    private proyectosRepository: Repository<Proyecto>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.backendUrl = this.configService.get('BACKEND_URL');
    this.configuracionUrl = this.configService.get('CONFIGURACION_URL');
  }

  async create(createProyectoDto: CreateProyectoDto) {
    await this.verificarEstado(createProyectoDto.estado);
    
    const proyecto = this.proyectosRepository.create(createProyectoDto);
    return await this.proyectosRepository.save(proyecto);
  }

  async findAll(activo?: boolean) {
    const where = activo !== undefined ? { activo } : {};
    return await this.proyectosRepository.find({ where });
  }

  async findOne(id: number) {
    const proyecto = await this.proyectosRepository.findOne({ 
      where: { id_proyecto: id } 
    });
    
    if (!proyecto) {
      throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
    }
    
    return proyecto;
  }

  async getSalidasPorProyecto(idProyecto: number) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.backendUrl}/salidas-inventario?id_proyecto=${idProyecto}`)
      );
      return response.data;
    } catch (error) {
      console.error('Error al obtener salidas:', error.message);
      return [];
    }
  }

  async getOrdenesCompraPorProyecto(idProyecto: number) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.backendUrl}/ordenes-compra?id_proyecto=${idProyecto}`)
      );
      return response.data;
    } catch (error) {
      console.error('Error al obtener órdenes de compra:', error.message);
      return [];
    }
  }

  async getRecursosUtilizados(idProyecto: number) {
    const salidas = await this.getSalidasPorProyecto(idProyecto);
    const ordenes = await this.getOrdenesCompraPorProyecto(idProyecto);
    
    return {
      proyecto_id: idProyecto,
      salidas_totales: salidas.length,
      ordenes_compra_totales: ordenes.length,
      salidas,
      ordenes_compra: ordenes,
    };
  }

  async update(id: number, updateProyectoDto: UpdateProyectoDto) {
    const proyecto = await this.findOne(id);
    
    if (updateProyectoDto.estado) {
      await this.verificarEstado(updateProyectoDto.estado);
    }
    
    Object.assign(proyecto, updateProyectoDto);
    return await this.proyectosRepository.save(proyecto);
  }

  async remove(id: number) {
    const proyecto = await this.findOne(id);
    proyecto.activo = false;
    return await this.proyectosRepository.save(proyecto);
  }

  private async verificarEstado(idEstado: number) {
    try {
      await firstValueFrom(
        this.httpService.get(`${this.configuracionUrl}/estados/${idEstado}`)
      );
    } catch (error) {
      throw new NotFoundException(`Estado con ID ${idEstado} no encontrado`);
    }
  }
}