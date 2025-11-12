import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe } from '@nestjs/common';
import { DetallesTransferenciaService } from './detalles-transferencia.service';
import { CreateDetalleTransferenciaDto } from './dto/create-detalle-transferencia.dto';
import { UpdateDetalleTransferenciaDto } from './dto/update-detalle-transferencia.dto';
import { CreateManyDetallesTransferenciaDto } from './dto/create-many-detalles-transferencia.dto';
// Importamos los decoradores de Swagger
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('detalles-transferencia')
@Controller('detalles-transferencia')
export class DetallesTransferenciaController {
  constructor(private readonly service: DetallesTransferenciaService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un único registro de Detalle de Transferencia.' })
  @ApiResponse({ status: 201, description: 'Detalle de transferencia creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos o stock insuficiente en el almacén de origen.' })
  create(@Body() dto: CreateDetalleTransferenciaDto) {
    return this.service.create(dto);
  }

  @Post('bulk')
  @ApiOperation({ summary: 'Crea múltiples registros de Detalles de Transferencia simultáneamente.' })
  @ApiResponse({ status: 201, description: 'Múltiples detalles de transferencia creados exitosamente.' })
  @ApiResponse({ status: 400, description: 'Lista de detalles inválida, o stock insuficiente en el almacén de origen para algún material.' })
  createMany(@Body() payload: CreateManyDetallesTransferenciaDto) {
    return this.service.createMany(payload);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene una lista paginada de detalles de transferencias, con opciones de filtro.' })
  // Documentación de los parámetros de consulta (Query)
  @ApiQuery({ name: 'id_transferencia', required: false, type: Number, description: 'Filtrar por ID de la transferencia principal (cabecera).', example: 5 })
  @ApiQuery({ name: 'id_material', required: false, type: Number, description: 'Filtrar por ID del material en el detalle.', example: 12 })
  @ApiQuery({ name: 'activo', required: false, type: Boolean, description: 'Filtrar por estado activo (true/false).', example: true })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página para la paginación (default: 1).', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Elementos por página (default: 20).', example: 20 })
  @ApiResponse({ status: 200, description: 'Lista de detalles de transferencia.' })
  findAll(
    @Query('id_transferencia') id_transferencia?: string,
    @Query('id_material') id_material?: string,
    @Query('activo') activo?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.service.findAll({
      id_transferencia: id_transferencia ? Number(id_transferencia) : undefined,
      id_material: id_material ? Number(id_material) : undefined,
      activo: typeof activo === 'string' ? activo === 'true' : undefined,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene los detalles de un registro de Detalle de Transferencia por su ID.' })
  @ApiParam({ name: 'id', description: 'ID del detalle de transferencia.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Detalle de transferencia encontrado.' })
  @ApiResponse({ status: 404, description: 'Detalle de transferencia no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) { // Usamos ParseIntPipe
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza parcial o totalmente un registro de Detalle de Transferencia.' })
  @ApiParam({ name: 'id', description: 'ID del detalle de transferencia a actualizar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Detalle de transferencia actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Detalle de transferencia no encontrado.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDetalleTransferenciaDto) { // Usamos ParseIntPipe
    return this.service.update(id, dto);
  }

  @Delete(':id/def')
  @ApiOperation({ summary: 'Eliminación física (definitiva) de un registro de Detalle de Transferencia.' })
  @ApiParam({ name: 'id', description: 'ID del detalle de transferencia a eliminar definitivamente.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Detalle de transferencia eliminado definitivamente.' })
  @ApiResponse({ status: 404, description: 'Detalle de transferencia no encontrado.' })
  hardDelete(@Param('id', ParseIntPipe) id: number) { // Usamos ParseIntPipe
    return this.service.hardDelete(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminación lógica (desactivación: activo = false) de un registro de Detalle de Transferencia.' })
  @ApiParam({ name: 'id', description: 'ID del detalle de transferencia a desactivar (borrado lógico).', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Detalle de transferencia desactivado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Detalle de transferencia no encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) { // Usamos ParseIntPipe
    return this.service.remove(id);
  }

  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restaura un registro de Detalle de Transferencia previamente eliminado lógicamente (activo = true).' })
  @ApiParam({ name: 'id', description: 'ID del detalle de transferencia a restaurar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Detalle de transferencia restaurado a activo exitosamente.' })
  @ApiResponse({ status: 404, description: 'Detalle de transferencia no encontrado.' })
  restore(@Param('id', ParseIntPipe) id: number) { // Usamos ParseIntPipe
    return this.service.restore(id);
  }
}