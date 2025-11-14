import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    return this.proveedorRepository.save(proveedor);
  }

  findAll(activo: boolean = true): Promise<Proveedor[]> {
    // Permite filtrar por activo o inactivo
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
    const proveedor = await this.findOne(id);
    this.proveedorRepository.merge(proveedor, updateDto);
    return this.proveedorRepository.save(proveedor);
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    // Soft Delete (inactiva el registro)
    const result = await this.proveedorRepository.update(id, { activo: false });
    
    if (result.affected === 0) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado.`);
    }
    return { deleted: true, message: `Proveedor ${id} marcado como INACTIVO.` };
  }
}