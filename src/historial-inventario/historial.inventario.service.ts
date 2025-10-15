import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { HistorialInventario } from './historial-inventario.entity'; // Asume la entidad

@Injectable()
export class HistorialInventarioService {
  constructor(
    @InjectRepository(HistorialInventario) // Debe coincidir con la entidad real
    private historialRepository: Repository<HistorialInventario>,
  ) {}

  async create(createHistorialDto: CreateHistorialDto): Promise<HistorialInventario> {
    // NOTA: En un caso real, aquí iría la lógica para actualizar el stock en la tabla 'inventario'
    
    const newRecord = this.historialRepository.create(createHistorialDto);
    return this.historialRepository.save(newRecord);
  }

  async findAll(): Promise<HistorialInventario[]> {
    // Se recomienda usar relaciones o paginación en historial por ser una tabla muy grande.
    return this.historialRepository.find();
  }

  async findOne(id: number): Promise<HistorialInventario> {
    const record = await this.historialRepository.findOneBy({ id });
    if (!record) {
      throw new NotFoundException(`Registro de Historial con ID ${id} no encontrado.`);
    }
    return record;
  }
}