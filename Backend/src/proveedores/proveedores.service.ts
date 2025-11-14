import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Proveedor } from './proveedor.entity';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
  ) {}

  async create(createDto: CreateProveedorDto): Promise<Proveedor> {
    const proveedor = this.proveedorRepository.create(createDto);
    // NOTA: TypeORM lanzará un error 409 si el NIT ya existe (UNIQUE constraint).
    return this.proveedorRepository.save(proveedor);
  }

  // Ahora usa el filtro opcional, lo cual es excelente
  findAll(activo: boolean = true): Promise<Proveedor[]> {
    return this.proveedorRepository.find({ where: { activo } });
  }

  async findOne(id: number): Promise<Proveedor> {
    // Busca por nueva PK id_proveedor y estado activo
    const proveedor = await this.proveedorRepository.findOne({ where: { id_proveedor: id, activo: true } });
    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado.`);
    }
    return proveedor;
  }

  async update(id: number, updateDto: UpdateProveedorDto): Promise<Proveedor> {
    // Reutiliza findOne para asegurar que existe y está activo
    const proveedor = await this.findOne(id);
    this.proveedorRepository.merge(proveedor, updateDto);
    return this.proveedorRepository.save(proveedor);
  }

  // 1. Borrado Lógico (Soft Delete)
  // 🚨 AJUSTE: Cambiado el retorno a Promise<void> para el 204.
  async remove(id: number): Promise<void> {
    // Asegura que el proveedor existe y está activo antes de desactivarlo.
    await this.findOne(id); 
    
    // Soft Delete (inactiva el registro)
    await this.proveedorRepository.update(id, { activo: false });
  }

  // 2. Borrado Permanente (Hard Delete)
  async hardRemove(id: number): Promise<void> {
    try {
      const result = await this.proveedorRepository.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException(`Proveedor con ID ${id} no encontrado para borrado permanente.`);
      }
    } catch (error) {
      // 🚨 MANEJO CRÍTICO DE ERROR: Proveedores también tiene llaves foráneas.
      // (ej. si tienes una tabla de 'productos' o 'ordenes_compra' relacionadas)
      if (error instanceof QueryFailedError && error.driverError.code === '23503') {
        throw new ConflictException(
          `El Proveedor con ID ${id} no puede ser eliminado permanentemente porque tiene registros dependientes (ej. productos u órdenes de compra). Desactívelo (remove) o elimine primero sus referencias.`,
        );
      }
      throw error;
    }
  }
}