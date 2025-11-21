import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './roles.entity';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolesRepo: Repository<Rol>,
  ) {}

  findAll() {
    return this.rolesRepo.find();
  }

  async findOne(id: number) {
    const rol = await this.rolesRepo.findOne({
      where: { id_cargo: id },
    });

    if (!rol) {
      throw new NotFoundException(`El rol con ID ${id} no existe`);
    }

    return rol;
  }

  create(dto: CreateRolDto) {
    const rol = this.rolesRepo.create(dto);
    return this.rolesRepo.save(rol);
  }

  async update(id: number, dto: UpdateRolDto) {
    const rol = await this.findOne(id); // verifica existencia
    Object.assign(rol, dto);
    return this.rolesRepo.save(rol);
  }

  async delete(id: number) {
    const rol = await this.findOne(id);
    await this.rolesRepo.remove(rol);
    return { message: `Rol con ID ${id} eliminado correctamente` };
  }
}
