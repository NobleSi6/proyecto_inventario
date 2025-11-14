import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnidadMedida } from './unidades-medida.entity';
import { CreateUnidadMedidaDto } from './dto/create-unidad-medida.dto';
import { UpdateUnidadMedidaDto } from './dto/update-unidad-medida.dto';

@Injectable()
export class UnidadesMedidaService {
  constructor(
    @InjectRepository(UnidadMedida)
    private readonly unidadMedidaRepository: Repository<UnidadMedida>,
  ) {}

  async create(createDto: CreateUnidadMedidaDto): Promise<UnidadMedida> {
    const unidad = this.unidadMedidaRepository.create(createDto);
    return this.unidadMedidaRepository.save(unidad);
  }

  findAll(): Promise<UnidadMedida[]> {
    // Solo busca unidades activas por defecto
    return this.unidadMedidaRepository.find({ where: { activo: true } });
  }

  async findOne(id: number): Promise<UnidadMedida> {
    // Busca por nueva PK id_unidad y estado activo
    const unidad = await this.unidadMedidaRepository.findOne({ where: { id_unidad: id, activo: true } });
    if (!unidad) {
      throw new NotFoundException(`Unidad de Medida con ID ${id} no encontrada.`);
    }
    return unidad;
  }

  async update(id: number, updateDto: UpdateUnidadMedidaDto): Promise<UnidadMedida> {
    const unidad = await this.findOne(id);
    this.unidadMedidaRepository.merge(unidad, updateDto);
    return this.unidadMedidaRepository.save(unidad);
  }

  async remove(id: number): Promise<void> {
    // Soft Delete (inactiva el registro)
    const result = await this.unidadMedidaRepository.update(id, { activo: false });
    if (result.affected === 0) {
      throw new NotFoundException(`Unidad de Medida con ID ${id} no encontrada.`);
    }
  }
}