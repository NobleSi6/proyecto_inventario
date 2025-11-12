import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { StockAlmacenService } from './stock-almacen.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
// Importamos los decoradores de Swagger necesarios
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('stock-almacen')
@Controller('stock-almacen')
export class StockAlmacenController {
  constructor(private readonly service: StockAlmacenService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo registro de stock para un material/almacén.' })
  @ApiResponse({ status: 201, description: 'Registro de stock creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos o el stock ya existe para esa combinación de material/almacén.' })
  create(@Body() dto: CreateStockDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene una lista paginada de registros de stock, con filtros detallados por material, almacén y cantidades.' })
  // Documentación de los parámetros de consulta (Query)
  @ApiQuery({ name: 'id_material', required: false, type: Number, description: 'Filtrar por ID del material.' })
  @ApiQuery({ name: 'id_almacen', required: false, type: Number, description: 'Filtrar por ID del almacén.' })
  @ApiQuery({ name: 'activo', required: false, type: Boolean, description: 'Filtrar por estado activo (true/false).', example: true })
  @ApiQuery({ name: 'dispMin', required: false, type: Number, description: 'Filtrar por Cantidad Disponible Mínima.' })
  @ApiQuery({ name: 'dispMax', required: false, type: Number, description: 'Filtrar por Cantidad Disponible Máxima.' })
  @ApiQuery({ name: 'resMin', required: false, type: Number, description: 'Filtrar por Cantidad Reservada Mínima.' })
  @ApiQuery({ name: 'resMax', required: false, type: Number, description: 'Filtrar por Cantidad Reservada Máxima.' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página para la paginación (default: 1).', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Elementos por página (default: 20).', example: 20 })
  @ApiResponse({ status: 200, description: 'Lista de registros de stock.' })
  findAll(
    @Query('id_material') id_material?: string,
    @Query('id_almacen') id_almacen?: string,
    @Query('activo') activo?: string,
    @Query('dispMin') dispMin?: string,
    @Query('dispMax') dispMax?: string,
    @Query('resMin') resMin?: string,
    @Query('resMax') resMax?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.service.findAll({
      id_material: id_material ? Number(id_material) : undefined,
      id_almacen: id_almacen ? Number(id_almacen) : undefined,
      activo: typeof activo === 'string' ? activo === 'true' : undefined,
      dispMin: dispMin ? Number(dispMin) : undefined,
      dispMax: dispMax ? Number(dispMax) : undefined,
      resMin: resMin ? Number(resMin) : undefined,
      resMax: resMax ? Number(resMax) : undefined,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene los detalles de un registro de Stock por su ID.' })
  @ApiParam({ name: 'id', description: 'ID del registro de stock (clave primaria).', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Registro de stock encontrado.' })
  @ApiResponse({ status: 404, description: 'Registro de stock no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza parcial o totalmente un registro de Stock.' })
  @ApiParam({ name: 'id', description: 'ID del registro de stock a actualizar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Registro de stock actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Registro de stock no encontrado.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStockDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id/def')
  @ApiOperation({ summary: 'Eliminación física (definitiva) de un registro de Stock.' })
  @ApiParam({ name: 'id', description: 'ID del registro de stock a eliminar definitivamente.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Registro de stock eliminado definitivamente.' })
  @ApiResponse({ status: 404, description: 'Registro de stock no encontrado.' })
  hardDelete(@Param('id', ParseIntPipe) id: number) {
    return this.service.hardDelete(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminación lógica (desactivación: activo = false) de un registro de Stock.' })
  @ApiParam({ name: 'id', description: 'ID del registro de stock a desactivar (borrado lógico).', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Registro de stock desactivado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Registro de stock no encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restaura un registro de Stock previamente eliminado lógicamente (activo = true).' })
  @ApiParam({ name: 'id', description: 'ID del registro de stock a restaurar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Registro de stock restaurado a activo exitosamente.' })
  @ApiResponse({ status: 404, description: 'Registro de stock no encontrado.' })
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id);
  }
}