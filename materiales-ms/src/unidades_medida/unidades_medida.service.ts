import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnidadMedida } from './entities/unidad_medida.entity';
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

  async findAll(): Promise<UnidadMedida[]> {
    return this.unidadMedidaRepository.find();
  }

  async findOne(id: number): Promise<UnidadMedida> {
    const unidad = await this.unidadMedidaRepository.findOne({ where: { id_unidad: id } });
    if (!unidad) {
      throw new NotFoundException(`Unidad de medida con id ${id} no encontrada`);
    }
    return unidad;
  }

  async update(id: number, updateDto: UpdateUnidadMedidaDto): Promise<UnidadMedida> {
    const unidad = await this.findOne(id);
    Object.assign(unidad, updateDto);
    return this.unidadMedidaRepository.save(unidad);
  }

  async remove(id: number): Promise<void> {
    const result = await this.unidadMedidaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Unidad de medida con id ${id} no encontrada`);
    }
  }
}
