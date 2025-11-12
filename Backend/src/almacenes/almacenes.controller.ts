import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { AlmacenesService } from './almacenes.service';
import { CreateAlmacenDto } from './dto/create-almacen.dto';
import { UpdateAlmacenDto } from './dto/update-almacen.dto';
// Importamos todos los decoradores necesarios de Swagger
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('almacenes')
@Controller('almacenes')
export class AlmacenesController {
  constructor(private readonly service: AlmacenesService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo registro de Almacen.' })
  @ApiResponse({ status: 201, description: 'Almacen creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  create(@Body() dto: CreateAlmacenDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene una lista paginada de almacenes con opciones de filtro.' })
  // Documentación de los parámetros de consulta (Query)
  @ApiQuery({ name: 'q', required: false, description: 'Término de búsqueda por nombre o código.' })
  @ApiQuery({ name: 'ciudad', required: false, description: 'Filtrar por ciudad donde se ubica el almacén.' })
  @ApiQuery({ name: 'responsable', required: false, type: Number, description: 'Filtrar por ID del empleado responsable.' })
  @ApiQuery({ name: 'activo', required: false, type: Boolean, description: 'Filtrar por estado activo (true/false).' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página para la paginación (default: 1).', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Elementos por página (default: 20).', example: 20 })
  findAll(
    @Query('q') q?: string,
    @Query('ciudad') ciudad?: string,
    @Query('responsable') responsable?: string,
    @Query('activo') activo?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.service.findAll({
      q,
      ciudad,
      responsable: responsable ? Number(responsable) : undefined,
      activo: typeof activo === 'string' ? activo === 'true' : undefined,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene los detalles de un almacen por su ID.' })
  @ApiParam({ name: 'id', description: 'ID del almacén a buscar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Detalles del almacén encontrados.' })
  @ApiResponse({ status: 404, description: 'Almacén no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza parcial o totalmente un registro de Almacén.' })
  @ApiParam({ name: 'id', description: 'ID del almacén a actualizar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Almacén actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Almacén no encontrado.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAlmacenDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id/def')
  @ApiOperation({ summary: 'Eliminación física (definitiva) de un registro de Almacén.' })
  @ApiParam({ name: 'id', description: 'ID del almacén a eliminar definitivamente.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Almacén eliminado definitivamente.' })
  @ApiResponse({ status: 404, description: 'Almacén no encontrado.' })
  // **ATENCIÓN:** El esquema de BD podría bloquear esta acción por FK.
  @ApiResponse({ status: 409, description: 'Conflicto: No se puede eliminar por dependencia de FK.' })
  hardDelete(@Param('id', ParseIntPipe) id: number) {
    return this.service.hardDelete(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminación lógica (desactivación) de un registro de Almacén.' })
  @ApiParam({ name: 'id', description: 'ID del almacén a desactivar (borrado lógico).', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Almacén desactivado (borrado lógico) exitosamente.' })
  @ApiResponse({ status: 404, description: 'Almacén no encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restaura un registro de Almacén previamente eliminado (lógicamente).' })
  @ApiParam({ name: 'id', description: 'ID del almacén a restaurar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Almacén restaurado a activo exitosamente.' })
  @ApiResponse({ status: 404, description: 'Almacén no encontrado.' })
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id);
  }
}