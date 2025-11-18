import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { UnidadMedida } from './unidades-medida.entity'; // Asegúrate de que el nombre del archivo de entidad sea correcto
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
    // 🚨 CORRECCIÓN: Usamos id_unidad_medida, ya que es el nombre correcto de la PK en la Entidad
    const unidad = await this.unidadMedidaRepository.findOne({ where: { id_unidad_medida: id, activo: true } }); 
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

  // 1. Borrado Lógico (Soft Delete)
  async remove(id: number): Promise<void> {
    // 🚨 AJUSTE: Reutilizamos findOne para verificar existencia y estado activo
    await this.findOne(id); 
    
    // Soft Delete (inactiva el registro)
    await this.unidadMedidaRepository.update(id, { activo: false });
    // Ya no es necesario el chequeo de affected === 0
  }

  // 2. Borrado Permanente (Hard Delete)
  async hardRemove(id: number): Promise<void> {
    try {
      const result = await this.unidadMedidaRepository.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException(`Unidad de Medida con ID ${id} no encontrada para borrado permanente.`);
      }
    } catch (error) {
      // 🚨 MANEJO CRÍTICO DE ERROR: Las unidades de medida serán usadas en la tabla 'productos'.
      if (error instanceof QueryFailedError && error.driverError.code === '23503') {
        throw new ConflictException(
          `La Unidad de Medida con ID ${id} no puede ser eliminada permanentemente porque está siendo utilizada por la tabla de productos u otros registros dependientes. Desactívela (remove) o elimine primero sus referencias.`,
        );
      }
      throw error;
    }
  }
}