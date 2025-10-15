import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Almacen } from './almacen.entity'; // Asume la entidad
import { CreateAlmacenDto } from './dto/create-almacen.dto';
import { UpdateAlmacenDto } from './dto/update-almacen.dto';

@Injectable()
export class AlmacenService {
  constructor(
    @InjectRepository(Almacen) // Debe coincidir con la entidad real
    private almacenRepository: Repository<Almacen>,
  ) {}

  async create(createAlmacenDto: CreateAlmacenDto): Promise<Almacen> {
    const newAlmacen = this.almacenRepository.create(createAlmacenDto);
    return this.almacenRepository.save(newAlmacen);
  }

  async findAll(): Promise<Almacen[]> {
    return this.almacenRepository.find();
  }

  async findOne(id: number): Promise<Almacen> {
    const almacen = await this.almacenRepository.findOneBy({ id });
    if (!almacen) {
      throw new NotFoundException(`Almacén con ID ${id} no encontrado.`);
    }
    return almacen;
  }
  
  async update(id: number, updateAlmacenDto: UpdateAlmacenDto): Promise<Almacen> {
    const almacen = await this.findOne(id); // Reutiliza findOne para verificar existencia
    
    // Aplica las actualizaciones al objeto existente
    this.almacenRepository.merge(almacen, updateAlmacenDto);
    
    return this.almacenRepository.save(almacen);
  }

  async delete(id: number): Promise<void> {
    const result = await this.almacenRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Almacén con ID ${id} no encontrado para eliminar.`);
    }
  }
}