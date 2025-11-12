import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Patch, 
  Delete, 
  Param, 
  HttpCode, 
  HttpStatus,
  NotFoundException,
  ParseIntPipe // Importado para NestJS
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './rol.entity';
// Importamos los decoradores de Swagger
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('roles') // Etiqueta principal para Swagger UI
@Controller('roles') 
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // ----------------------------------------------------
  // C - CREATE (Crear)
  // ----------------------------------------------------
  @Post()
  @HttpCode(HttpStatus.CREATED) // Código 201
  @ApiOperation({ summary: 'Crea un nuevo rol o cargo en el sistema.' })
  @ApiResponse({ status: 201, description: 'Rol creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos (ej: cargo vacío o muy largo).' })
  async create(@Body() createRolDto: CreateRolDto): Promise<Rol> {
    return this.rolesService.create(createRolDto);
  }

  // ----------------------------------------------------
  // R - READ (Leer)
  // ----------------------------------------------------
  @Get() // GET /roles - Obtiene todos
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtiene la lista completa de roles/cargos.' })
  @ApiResponse({ status: 200, description: 'Lista de roles.' })
  async findAll(): Promise<Rol[]> {
    return this.rolesService.findAll();
  }

  @Get(':id') // GET /roles/:id - Obtiene por ID
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtiene los detalles de un rol por su ID.' })
  @ApiParam({ name: 'id', description: 'ID del rol.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Rol encontrado.' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado.' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Rol> {
    // Usamos ParseIntPipe: 'id' es ahora un número
    return this.rolesService.findOne(id); 
  }

  // ----------------------------------------------------
  // U - UPDATE (Actualizar)
  // ----------------------------------------------------
  @Patch(':id') // PATCH /roles/:id - Actualiza por ID
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualiza parcial o totalmente un rol por su ID.' })
  @ApiParam({ name: 'id', description: 'ID del rol a actualizar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Rol actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateRolDto: UpdateRolDto
  ): Promise<Rol> {
    // Usamos ParseIntPipe: 'id' es ahora un número
    return this.rolesService.update(id, updateRolDto);
  }

  // ----------------------------------------------------
  // D - DELETE (Eliminar)
  // ----------------------------------------------------
  @Delete(':id') // DELETE /roles/:id - Elimina por ID
  @HttpCode(HttpStatus.NO_CONTENT) // Código 204: No Content
  @ApiOperation({ summary: 'Eliminación física (definitiva) de un rol.' })
  @ApiParam({ name: 'id', description: 'ID del rol a eliminar.', type: Number, example: 1 })
  @ApiResponse({ status: 204, description: 'Rol eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado.' })
  @ApiResponse({ status: 409, description: 'Conflicto: No se puede eliminar por dependencia de FK (si hay empleados asociados).' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    // Usamos ParseIntPipe: 'id' es ahora un número
    await this.rolesService.remove(id);
    // No retorna nada (void) para cumplir con el código 204
  }
}