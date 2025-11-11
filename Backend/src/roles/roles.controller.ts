// src/roles/roles.controller.ts

import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Patch, // Importado para el método de actualización
  Delete, // Importado para el método de eliminación
  Param, // Importado para obtener el ID de la URL
  HttpCode, 
  HttpStatus,
  NotFoundException // Opcional, para manejar errores de forma explícita
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto'; // Importado
import { Rol } from './rol.entity';

@Controller('roles') // Ruta base: /roles
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // ----------------------------------------------------
  // C - CREATE (Crear)
  // ----------------------------------------------------
  @Post()
  @HttpCode(HttpStatus.CREATED) // Código 201
  async create(@Body() createRolDto: CreateRolDto): Promise<Rol> {
    return this.rolesService.create(createRolDto);
  }

  // ----------------------------------------------------
  // R - READ (Leer)
  // ----------------------------------------------------
  @Get() // GET /roles - Obtiene todos
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Rol[]> {
    return this.rolesService.findAll();
  }

  @Get(':id') // GET /roles/:id - Obtiene por ID
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<Rol> {
    // Usamos el operador '+' para convertir el string 'id' a número
    return this.rolesService.findOne(+id); 
  }

  // ----------------------------------------------------
  // U - UPDATE (Actualizar)
  // ----------------------------------------------------
  @Patch(':id') // PATCH /roles/:id - Actualiza por ID
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string, 
    @Body() updateRolDto: UpdateRolDto
  ): Promise<Rol> {
    // Usamos el operador '+' para convertir el string 'id' a número
    return this.rolesService.update(+id, updateRolDto);
  }

  // ----------------------------------------------------
  // D - DELETE (Eliminar)
  // ----------------------------------------------------
  @Delete(':id') // DELETE /roles/:id - Elimina por ID
  @HttpCode(HttpStatus.NO_CONTENT) // Código 204: No Content (eliminación exitosa sin cuerpo de respuesta)
  async remove(@Param('id') id: string): Promise<void> {
    // Usamos el operador '+' para convertir el string 'id' a número
    await this.rolesService.remove(+id);
    // No retorna nada (void) para cumplir con el código 204
  }
}