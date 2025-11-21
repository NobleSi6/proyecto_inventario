import { Controller, Post, Body, Get } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // Crear un nuevo rol
  @Post()
  async crear(@Body() payload: { tipo_cargo: string }) {
    return this.rolesService.crearRol(payload);
  }

  // Listar todos los roles
  @Get()
  async listar() {
    return this.rolesService.obtenerRoles();
  }
}
