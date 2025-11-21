// configuracion-service/src/estados/estados.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estado } from './entities/estado.entity';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';

@Injectable()
export class EstadosService {
  constructor(
    @InjectRepository(Estado)
    private estadosRepository: Repository<Estado>,
  ) {}

  async create(createEstadoDto: CreateEstadoDto) {
    const estado = this.estadosRepository.create(createEstadoDto);
    return await this.estadosRepository.save(estado);
  }

  async findAll() {
    return await this.estadosRepository.find();
  }

  async findActivos() {
    return await this.estadosRepository.find({ where: { activo: true } });
  }

  async findOne(id: number) {
    const estado = await this.estadosRepository.findOne({ 
      where: { id_estado: id } 
    });
    
    if (!estado) {
      throw new NotFoundException(`Estado con ID ${id} no encontrado`);
    }
    
    return estado;
  }

  async update(id: number, updateEstadoDto: UpdateEstadoDto) {
    const estado = await this.findOne(id);
    Object.assign(estado, updateEstadoDto);
    return await this.estadosRepository.save(estado);
  }

  async remove(id: number) {
    const estado = await this.findOne(id);
    estado.activo = false;
    return await this.estadosRepository.save(estado);
  }
}