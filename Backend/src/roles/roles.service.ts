// src/roles/roles.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto'; // Asegúrate de importar el DTO de actualización

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private rolesRepository: Repository<Rol>,
  ) {}

  // C - CREATE (Crear)
  async create(createRolDto: CreateRolDto): Promise<Rol> {
    const newRol = this.rolesRepository.create(createRolDto);
    return this.rolesRepository.save(newRol);
  }
// Hola esto es para hacer un pull request
  // R - READ (Leer todos)
  findAll(): Promise<Rol[]> {
    return this.rolesRepository.find();
  }

  // ----------------------------------------------------
  // ✅ Nuevo método: R - READ (Leer por ID)
  // ----------------------------------------------------
  async findOne(id: number): Promise<Rol> {
    // Usamos findOneBy para buscar por la clave primaria 'id'
    const rol = await this.rolesRepository.findOneBy({ id }); 

    if (!rol) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado.`);
    }

    return rol;
  }
  // ----------------------------------------------------

  // ----------------------------------------------------
  // ✅ Nuevo método: U - UPDATE (Actualizar)
  // ----------------------------------------------------
  async update(id: number, updateRolDto: UpdateRolDto): Promise<Rol> {
    // 1. Buscamos el rol para asegurar que exista (lanza NotFoundException si no existe)
    const rol = await this.findOne(id); 

    // 2. Aplicamos los cambios del DTO al objeto existente.
    // Esto es especialmente útil para PATCH, donde solo se actualizan algunos campos.
    this.rolesRepository.merge(rol, updateRolDto);

    // 3. Guardamos los cambios.
    return this.rolesRepository.save(rol);
  }
  // ----------------------------------------------------

  // ----------------------------------------------------
  // ✅ Nuevo método: D - DELETE (Eliminar)
  // ----------------------------------------------------
  async remove(id: number): Promise<void> {
    const result = await this.rolesRepository.delete(id);
    
    // Si TypeORM no afecta ninguna fila, significa que el ID no existía.
    if (result.affected === 0) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado para eliminar.`);
    }
    // Si lo encuentra y elimina, retorna void (no content).
  }
}