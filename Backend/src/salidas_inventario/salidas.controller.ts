import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { SalidasService } from './salidas.service';
import { CreateSalidaDto } from './dto/create-salida.dto';
import { UpdateSalidaDto } from './dto/update-salida.dto';
// Importamos los decoradores de Swagger necesarios
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('salidas')
@Controller('salidas')
export class SalidasController {
  constructor(private readonly service: SalidasService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo registro de Salida de Inventario (Cabecera).' })
  @ApiResponse({ status: 201, description: 'Salida de inventario creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos o FKs inexistentes.' })
  create(@Body() dto: CreateSalidaDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene una lista paginada de Salidas de Inventario con opciones de filtro.' })
  // Documentación de los parámetros de consulta (Query)
  @ApiQuery({ name: 'q', required: false, description: 'Término de búsqueda por número de salida u observaciones.' })
  @ApiQuery({ name: 'id_almacen', required: false, type: Number, description: 'Filtrar por ID del almacén de origen.', example: 1 })
  @ApiQuery({ name: 'id_proyecto', required: false, type: Number, description: 'Filtrar por ID del proyecto o destino.', example: 5 })
  @ApiQuery({ name: 'desde', required: false, type: String, description: 'Filtrar salidas a partir de esta fecha (YYYY-MM-DD).', example: '2024-01-01' })
  @ApiQuery({ name: 'hasta', required: false, type: String, description: 'Filtrar salidas hasta esta fecha (YYYY-MM-DD).', example: '2024-12-31' })
  @ApiQuery({ name: 'activo', required: false, type: Boolean, description: 'Filtrar por estado activo (true/false).', example: true })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página para la paginación (default: 1).', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Elementos por página (default: 20).', example: 20 })
  @ApiResponse({ status: 200, description: 'Lista de salidas de inventario.' })
  findAll(
    @Query('q') q?: string,
    @Query('id_almacen') id_almacen?: string,
    @Query('id_proyecto') id_proyecto?: string,
    @Query('desde') desde?: string,
    @Query('hasta') hasta?: string,
    @Query('activo') activo?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.service.findAll({
      q,
      id_almacen: id_almacen ? Number(id_almacen) : undefined,
      id_proyecto: id_proyecto ? Number(id_proyecto) : undefined,
      desde,
      hasta,
      activo: typeof activo === 'string' ? activo === 'true' : undefined,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene los detalles de una Salida de Inventario por su ID.' })
  @ApiParam({ name: 'id', description: 'ID de la cabecera de salida.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Salida de inventario encontrada.' })
  @ApiResponse({ status: 404, description: 'Salida de inventario no encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza parcial o totalmente una Salida de Inventario (Cabecera).' })
  @ApiParam({ name: 'id', description: 'ID de la salida a actualizar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Salida de inventario actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Salida de inventario no encontrada.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSalidaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id/def')
  @ApiOperation({ summary: 'Eliminación física (definitiva) de una Salida de Inventario.' })
  @ApiParam({ name: 'id', description: 'ID de la salida a eliminar definitivamente.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Salida de inventario eliminada definitivamente (y sus detalles por CASCADE).' })
  @ApiResponse({ status: 404, description: 'Salida de inventario no encontrada.' })
  hardDelete(@Param('id', ParseIntPipe) id: number) {
    return this.service.hardDelete(id);
  }
 
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminación lógica (desactivación: activo = false) de una Salida de Inventario.' })
  @ApiParam({ name: 'id', description: 'ID de la salida a desactivar (borrado lógico).', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Salida de inventario desactivada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Salida de inventario no encontrada.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restaura una Salida de Inventario eliminada lógicamente (activo = true).' })
  @ApiParam({ name: 'id', description: 'ID de la salida a restaurar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Salida de inventario restaurada a activo exitosamente.' })
  @ApiResponse({ status: 404, description: 'Salida de inventario no encontrada.' })
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id);
  }
}