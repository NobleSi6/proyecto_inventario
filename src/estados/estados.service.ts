import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estado } from './estado.entity';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';

@Injectable()
export class EstadosService {
  constructor(
    @InjectRepository(Estado)
    private readonly estadoRepository: Repository<Estado>,
  ) {}

  async create(createDto: CreateEstadoDto): Promise<Estado> {
    const estado = this.estadoRepository.create(createDto);
    return this.estadoRepository.save(estado);
  }

  findAll(): Promise<Estado[]> {
    // Solo busca estados activos por defecto
    return this.estadoRepository.find({ where: { activo: true } });
  }

  async findOne(id: number): Promise<Estado> {
    // Busca por nueva PK id_estado y estado activo
    const estado = await this.estadoRepository.findOne({ where: { id_estado: id, activo: true } });
    if (!estado) {
      throw new NotFoundException(`Estado con ID ${id} no encontrado.`);
    }
    return estado;
  }

  async update(id: number, updateDto: UpdateEstadoDto): Promise<Estado> {
    const estado = await this.findOne(id);
    this.estadoRepository.merge(estado, updateDto);
    return this.estadoRepository.save(estado);
  }

  async remove(id: number): Promise<void> {
    // Soft Delete (inactiva el registro)
    const result = await this.estadoRepository.update(id, { activo: false });
    if (result.affected === 0) {
      throw new NotFoundException(`Estado con ID ${id} no encontrado.`);
    }
  }
}