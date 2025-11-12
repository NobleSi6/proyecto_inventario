import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { HistorialMovimientosService } from './historial-movimientos.service';
import { CreateHistorialMovimientoDto } from './dto/create-historial-movimiento.dto';
import { UpdateHistorialMovimientoDto } from './dto/update-historial-movimiento.dto';
// Importamos los decoradores de Swagger necesarios
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('historial-movimientos')
@Controller('historial-movimientos')
export class HistorialMovimientosController {
  constructor(private readonly service: HistorialMovimientosService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo registro de movimiento en el historial (debe ser usado internamente por los servicios de transacciones).' })
  @ApiResponse({ status: 201, description: 'Registro de historial creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos o FKs inexistentes.' })
  create(@Body() dto: CreateHistorialMovimientoDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene una lista paginada de movimientos del historial con opciones de filtro.' })
  // Documentación de los parámetros de consulta (Query)
  @ApiQuery({ name: 'q', required: false, description: 'Término de búsqueda por referencia u observaciones.' })
  @ApiQuery({ name: 'tipo', required: false, description: 'Filtrar por tipo de movimiento (ej: entrada, salida, ajuste).', example: 'salida' })
  @ApiQuery({ name: 'id_material', required: false, type: Number, description: 'Filtrar por ID del material involucrado.', example: 5 })
  @ApiQuery({ name: 'id_almacen', required: false, type: Number, description: 'Filtrar por ID del almacén donde ocurrió el movimiento.', example: 2 })
  @ApiQuery({ name: 'id_empleado', required: false, type: Number, description: 'Filtrar por ID del empleado responsable.', example: 10 })
  @ApiQuery({ name: 'desde', required: false, type: String, description: 'Filtrar movimientos a partir de esta fecha (YYYY-MM-DD).', example: '2024-01-01' })
  @ApiQuery({ name: 'hasta', required: false, type: String, description: 'Filtrar movimientos hasta esta fecha (YYYY-MM-DD).', example: '2024-12-31' })
  @ApiQuery({ name: 'activo', required: false, type: Boolean, description: 'Filtrar por estado activo (true/false).', example: true })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página para la paginación (default: 1).', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Elementos por página (default: 20).', example: 20 })
  @ApiResponse({ status: 200, description: 'Lista de registros de historial de movimientos.' })
  findAll(
    @Query('q') q?: string,
    @Query('tipo') tipo?: string,
    @Query('id_material') id_material?: string,
    @Query('id_almacen') id_almacen?: string,
    @Query('id_empleado') id_empleado?: string,
    @Query('desde') desde?: string,
    @Query('hasta') hasta?: string,
    @Query('activo') activo?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.service.findAll({
      q,
      tipo,
      id_material: id_material ? Number(id_material) : undefined,
      id_almacen: id_almacen ? Number(id_almacen) : undefined,
      id_empleado: id_empleado ? Number(id_empleado) : undefined,
      desde,
      hasta,
      activo: typeof activo === 'string' ? activo === 'true' : undefined,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene los detalles de un registro de Historial de Movimiento por su ID.' })
  @ApiParam({ name: 'id', description: 'ID del registro de historial.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Registro de historial encontrado.' })
  @ApiResponse({ status: 404, description: 'Registro de historial no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza parcial o totalmente un registro de Historial de Movimiento.' })
  @ApiParam({ name: 'id', description: 'ID del registro de historial a actualizar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Registro de historial actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Registro de historial no encontrado.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateHistorialMovimientoDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id/def')
  @ApiOperation({ summary: 'Eliminación física (definitiva) de un registro de Historial de Movimiento.' })
  @ApiParam({ name: 'id', description: 'ID del registro de historial a eliminar definitivamente.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Registro de historial eliminado definitivamente.' })
  @ApiResponse({ status: 404, description: 'Registro de historial no encontrado.' })
  hardDelete(@Param('id', ParseIntPipe) id: number) {
    return this.service.hardDelete(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminación lógica (desactivación: activo = false) de un registro de Historial de Movimiento.' })
  @ApiParam({ name: 'id', description: 'ID del registro de historial a desactivar (borrado lógico).', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Registro de historial desactivado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Registro de historial no encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restaura un registro de Historial de Movimiento previamente eliminado lógicamente (activo = true).' })
  @ApiParam({ name: 'id', description: 'ID del registro de historial a restaurar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Registro de historial restaurado a activo exitosamente.' })
  @ApiResponse({ status: 404, description: 'Registro de historial no encontrado.' })
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id);
  }
}