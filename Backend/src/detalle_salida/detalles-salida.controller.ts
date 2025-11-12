import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe } from '@nestjs/common';
import { DetallesSalidaService } from './detalles-salida.service';
import { CreateDetalleSalidaDto } from './dto/create-detalle-salida.dto';
import { UpdateDetalleSalidaDto } from './dto/update-detalle-salida.dto';
import { CreateManyDetallesDto } from './dto/create-many-detalles.dto';
// Importamos los decoradores de Swagger necesarios
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('detalles-salida')
@Controller('detalles-salida')
export class DetallesSalidaController {
  constructor(private readonly service: DetallesSalidaService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un único registro de Detalle de Salida.' })
  @ApiResponse({ status: 201, description: 'Detalle de salida creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos o stock insuficiente.' })
  create(@Body() dto: CreateDetalleSalidaDto) {
    return this.service.create(dto);
  }

  @Post('bulk')
  @ApiOperation({ summary: 'Crea múltiples registros de Detalles de Salida simultáneamente.' })
  @ApiResponse({ status: 201, description: 'Múltiples detalles de salida creados exitosamente.' })
  @ApiResponse({ status: 400, description: 'Lista de detalles inválida, o uno o más materiales con stock insuficiente.' })
  createMany(@Body() payload: CreateManyDetallesDto) {
    return this.service.createMany(payload);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene una lista paginada de detalles de salidas, con opciones de filtro.' })
  // Documentación de los parámetros de consulta (Query)
  @ApiQuery({ name: 'id_salida', required: false, type: Number, description: 'Filtrar por ID de la salida principal (cabecera).', example: 5 })
  @ApiQuery({ name: 'id_material', required: false, type: Number, description: 'Filtrar por ID del material en el detalle.', example: 12 })
  @ApiQuery({ name: 'activo', required: false, type: Boolean, description: 'Filtrar por estado activo (true/false).', example: true })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página para la paginación (default: 1).', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Elementos por página (default: 20).', example: 20 })
  @ApiResponse({ status: 200, description: 'Lista de detalles de salida.' })
  findAll(
    @Query('id_salida') id_salida?: string,
    @Query('id_material') id_material?: string,
    @Query('activo') activo?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.service.findAll({
      id_salida: id_salida ? Number(id_salida) : undefined,
      id_material: id_material ? Number(id_material) : undefined,
      activo: typeof activo === 'string' ? activo === 'true' : undefined,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene los detalles de un registro de Detalle de Salida por su ID.' })
  @ApiParam({ name: 'id', description: 'ID del detalle de salida.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Detalle de salida encontrado.' })
  @ApiResponse({ status: 404, description: 'Detalle de salida no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza parcial o totalmente un registro de Detalle de Salida.' })
  @ApiParam({ name: 'id', description: 'ID del detalle de salida a actualizar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Detalle de salida actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Detalle de salida no encontrado.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDetalleSalidaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id/def')
  @ApiOperation({ summary: 'Eliminación física (definitiva) de un registro de Detalle de Salida.' })
  @ApiParam({ name: 'id', description: 'ID del detalle de salida a eliminar definitivamente.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Detalle de salida eliminado definitivamente.' })
  @ApiResponse({ status: 404, description: 'Detalle de salida no encontrado.' })
  hardDelete(@Param('id', ParseIntPipe) id: number) {
    return this.service.hardDelete(id);
  }
  
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminación lógica (desactivación: activo = false) de un registro de Detalle de Salida.' })
  @ApiParam({ name: 'id', description: 'ID del detalle de salida a desactivar (borrado lógico).', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Detalle de salida desactivado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Detalle de salida no encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restaura un registro de Detalle de Salida previamente eliminado lógicamente (activo = true).' })
  @ApiParam({ name: 'id', description: 'ID del detalle de salida a restaurar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Detalle de salida restaurado a activo exitosamente.' })
  @ApiResponse({ status: 404, description: 'Detalle de salida no encontrado.' })
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id);
  }
}