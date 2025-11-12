import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { MaterialesService } from './materiales.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
// Importamos los decoradores de Swagger necesarios
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('materiales')
@Controller('materiales')
export class MaterialesController {
  constructor(private readonly service: MaterialesService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo material en el catálogo de inventario.' })
  @ApiResponse({ status: 201, description: 'Material creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos (ej: código duplicado).' })
  create(@Body() dto: CreateMaterialDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene una lista paginada de materiales con opciones de filtro.' })
  // Documentación de los parámetros de consulta (Query)
  @ApiQuery({ name: 'q', required: false, description: 'Término de búsqueda por código o nombre del material.' })
  @ApiQuery({ name: 'id_categoria', required: false, type: Number, description: 'Filtrar por ID de categoría.' })
  @ApiQuery({ name: 'id_unidad', required: false, type: Number, description: 'Filtrar por ID de unidad de medida.' })
  @ApiQuery({ name: 'precioMin', required: false, type: Number, description: 'Filtrar por precio unitario mínimo.' })
  @ApiQuery({ name: 'precioMax', required: false, type: Number, description: 'Filtrar por precio unitario máximo.' })
  @ApiQuery({ name: 'activo', required: false, type: Boolean, description: 'Filtrar por estado activo (true/false).', example: true })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página para la paginación (default: 1).', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Elementos por página (default: 20).', example: 20 })
  @ApiResponse({ status: 200, description: 'Lista de materiales.' })
  findAll(
    @Query('q') q?: string,
    @Query('id_categoria') id_categoria?: string,
    @Query('id_unidad') id_unidad?: string,
    @Query('precioMin') precioMin?: string,
    @Query('precioMax') precioMax?: string,
    @Query('activo') activo?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.service.findAll({
      q,
      id_categoria: id_categoria ? Number(id_categoria) : undefined,
      id_unidad: id_unidad ? Number(id_unidad) : undefined,
      precioMin: precioMin ? Number(precioMin) : undefined,
      precioMax: precioMax ? Number(precioMax) : undefined,
      activo: typeof activo === 'string' ? activo === 'true' : undefined,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene los detalles de un material por su ID.' })
  @ApiParam({ name: 'id', description: 'ID del material.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Material encontrado.' })
  @ApiResponse({ status: 404, description: 'Material no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza parcial o totalmente un registro de Material.' })
  @ApiParam({ name: 'id', description: 'ID del material a actualizar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Material actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Material no encontrado.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMaterialDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id/def')
  @ApiOperation({ summary: 'Eliminación física (definitiva) de un registro de Material.' })
  @ApiParam({ name: 'id', description: 'ID del material a eliminar definitivamente.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Material eliminado definitivamente.' })
  @ApiResponse({ status: 404, description: 'Material no encontrado.' })
  @ApiResponse({ status: 409, description: 'Conflicto: No se puede eliminar por dependencia de FK (si el material se usó en transacciones).' })
  hardDelete(@Param('id', ParseIntPipe) id: number) {
    return this.service.hardDelete(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminación lógica (desactivación: activo = false) de un registro de Material.' })
  @ApiParam({ name: 'id', description: 'ID del material a desactivar (borrado lógico).', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Material desactivado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Material no encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restaura un registro de Material previamente eliminado lógicamente (activo = true).' })
  @ApiParam({ name: 'id', description: 'ID del material a restaurar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Material restaurado a activo exitosamente.' })
  @ApiResponse({ status: 404, description: 'Material no encontrado.' })
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id);
  }
}