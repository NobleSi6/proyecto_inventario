import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm'; // Importamos QueryFailedError para manejar la FK
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

  // 1. Borrado Lógico (Soft Delete)
  async remove(id: number): Promise<void> {
    // Reutilizamos findOne para asegurar que existe y está activo antes de intentar desactivarlo
    await this.findOne(id); 
    
    // Soft Delete (inactiva el registro)
    await this.estadoRepository.update(id, { activo: false });
  }

  // 2. Borrado Permanente (Hard Delete)
  async hardRemove(id: number): Promise<void> {
    try {
      const result = await this.estadoRepository.delete(id);

      if (result.affected === 0) {
        // Si no se borró ninguna fila, significa que el Estado con ese ID no existía.
        throw new NotFoundException(`Estado con ID ${id} no encontrado para borrado permanente.`);
      }
    } catch (error) {
      // 🚨 MANEJO CRÍTICO DE ERROR: Violación de Llave Foránea
      if (error instanceof QueryFailedError) {
          // El código de error '23503' es el de Foreign Key Violation en PostgreSQL.
          if (error.driverError.code === '23503') {
            throw new ConflictException(
              `El Estado con ID ${id} no puede ser eliminado permanentemente porque está siendo utilizado por otras tablas (ej. órdenes de compra, proyectos). Desactívelo (remove) o elimine primero sus referencias.`,
            );
          }
      }
      // Si es otro tipo de error, lo relanzamos
      throw error;
    }
  }
}