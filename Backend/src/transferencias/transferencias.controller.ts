import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { TransferenciasService } from './transferencias.service';
import { CreateTransferenciaDto } from './dto/create-transferencia.dto';
import { UpdateTransferenciaDto } from './dto/update-transferencia.dto';
// Importamos los decoradores de Swagger necesarios
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('transferencias')
@Controller('transferencias')
export class TransferenciasController {
  constructor(private readonly service: TransferenciasService) {}

  @Post()
  @ApiOperation({ summary: 'Crea una nueva solicitud de Transferencia de Inventario (Cabecera).' })
  @ApiResponse({ status: 201, description: 'Transferencia creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos o FKs inexistentes.' })
  create(@Body() dto: CreateTransferenciaDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene una lista paginada de Transferencias de Inventario con múltiples opciones de filtro.' })
  // Documentación de los parámetros de consulta (Query)
  @ApiQuery({ name: 'q', required: false, description: 'Término de búsqueda por número de transferencia u observaciones.' })
  @ApiQuery({ name: 'id_almacen_origen', required: false, type: Number, description: 'Filtrar por ID del almacén de origen.', example: 1 })
  @ApiQuery({ name: 'id_almacen_destino', required: false, type: Number, description: 'Filtrar por ID del almacén de destino.', example: 2 })
  @ApiQuery({ name: 'id_empleado_autoriza', required: false, type: Number, description: 'Filtrar por ID del empleado que autorizó la transferencia.' })
  @ApiQuery({ name: 'id_empleado_solicitante', required: false, type: Number, description: 'Filtrar por ID del empleado que solicitó la transferencia.' })
  @ApiQuery({ name: 'estado', required: false, type: Number, description: 'Filtrar por ID del estado de la transferencia (ej: 1=Solicitada, 3=Recibida).', example: 2 })
  @ApiQuery({ name: 'desde', required: false, type: String, description: 'Filtrar transferencias creadas a partir de esta fecha (YYYY-MM-DD).', example: '2024-11-01' })
  @ApiQuery({ name: 'hasta', required: false, type: String, description: 'Filtrar transferencias creadas hasta esta fecha (YYYY-MM-DD).', example: '2024-11-30' })
  @ApiQuery({ name: 'recibidaDesde', required: false, type: String, description: 'Filtrar transferencias recibidas a partir de esta fecha (fecha_recepcion).', example: '2024-11-05' })
  @ApiQuery({ name: 'recibidaHasta', required: false, type: String, description: 'Filtrar transferencias recibidas hasta esta fecha (fecha_recepcion).', example: '2024-11-25' })
  @ApiQuery({ name: 'activo', required: false, type: Boolean, description: 'Filtrar por estado activo (true/false).', example: true })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página para la paginación (default: 1).', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Elementos por página (default: 20).', example: 20 })
  @ApiResponse({ status: 200, description: 'Lista de transferencias de inventario.' })
  findAll(
    @Query('q') q?: string,
    @Query('id_almacen_origen') id_almacen_origen?: string,
    @Query('id_almacen_destino') id_almacen_destino?: string,
    @Query('id_empleado_autoriza') id_empleado_autoriza?: string,
    @Query('id_empleado_solicitante') id_empleado_solicitante?: string,
    @Query('estado') estado?: string,
    @Query('desde') desde?: string,
    @Query('hasta') hasta?: string,
    @Query('recibidaDesde') recibidaDesde?: string,
    @Query('recibidaHasta') recibidaHasta?: string,
    @Query('activo') activo?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.service.findAll({
      q,
      id_almacen_origen: id_almacen_origen ? Number(id_almacen_origen) : undefined,
      id_almacen_destino: id_almacen_destino ? Number(id_almacen_destino) : undefined,
      id_empleado_autoriza: id_empleado_autoriza ? Number(id_empleado_autoriza) : undefined,
      id_empleado_solicitante: id_empleado_solicitante ? Number(id_empleado_solicitante) : undefined,
      estado: estado ? Number(estado) : undefined,
      desde,
      hasta,
      recibidaDesde,
      recibidaHasta,
      activo: typeof activo === 'string' ? activo === 'true' : undefined,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene los detalles de una Transferencia de Inventario por su ID.' })
  @ApiParam({ name: 'id', description: 'ID de la cabecera de transferencia.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Transferencia encontrada.' })
  @ApiResponse({ status: 404, description: 'Transferencia no encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza parcial o totalmente una Transferencia de Inventario (Cabecera).' })
  @ApiParam({ name: 'id', description: 'ID de la transferencia a actualizar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Transferencia actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Transferencia no encontrada.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTransferenciaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id/def')
  @ApiOperation({ summary: 'Eliminación física (definitiva) de una Transferencia de Inventario.' })
  @ApiParam({ name: 'id', description: 'ID de la transferencia a eliminar definitivamente.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Transferencia eliminada definitivamente (y sus detalles por CASCADE).' })
  @ApiResponse({ status: 404, description: 'Transferencia no encontrada.' })
  hardDelete(@Param('id', ParseIntPipe) id: number) {
    return this.service.hardDelete(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminación lógica (desactivación: activo = false) de una Transferencia de Inventario.' })
  @ApiParam({ name: 'id', description: 'ID de la transferencia a desactivar (borrado lógico).', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Transferencia desactivada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Transferencia no encontrada.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restaura una Transferencia de Inventario eliminada lógicamente (activo = true).' })
  @ApiParam({ name: 'id', description: 'ID de la transferencia a restaurar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Transferencia restaurada a activo exitosamente.' })
  @ApiResponse({ status: 404, description: 'Transferencia no encontrada.' })
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id);
  }
}