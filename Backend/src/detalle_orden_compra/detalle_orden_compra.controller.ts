import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DetalleOrdenCompraService } from './detalle_orden_compra.service';
import { CreateDetalleOrdenCompraDto } from './dto/create-detalle_orden_compra.dto';
import { UpdateDetalleOrdenCompraDto } from './dto/update-detalle_orden_compra.dto';
// Importamos los decoradores de Swagger necesarios
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('detalle-orden-compra')
@Controller('detalle-orden-compra')
export class DetalleOrdenCompraController {
  constructor(private service: DetalleOrdenCompraService) {}

  @Post()
  @ApiOperation({ summary: 'Agrega un material como detalle a una Orden de Compra existente.' })
  @ApiResponse({ status: 201, description: 'Detalle de orden de compra creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos o clave foránea no existente.' })
  @ApiResponse({ status: 404, description: 'Orden de Compra o Material no encontrado (FK error).' })
  create(@Body() dto: CreateDetalleOrdenCompraDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los registros de detalles de órdenes de compra.' })
  @ApiResponse({ status: 200, description: 'Lista de detalles de órdenes de compra.' })
  findAll() {
    // Si necesitan filtrar por ID de orden de compra, aquí deberían agregar @ApiQuery.
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene los detalles de un registro de Detalle de Orden de Compra por su ID.' })
  @ApiParam({ name: 'id', description: 'ID del detalle de orden de compra.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Detalle de orden de compra encontrado.' })
  @ApiResponse({ status: 404, description: 'Detalle de orden de compra no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza parcial o totalmente un registro de Detalle de Orden de Compra.' })
  @ApiParam({ name: 'id', description: 'ID del detalle de orden de compra a actualizar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Detalle de orden de compra actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Detalle de orden de compra no encontrado.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDetalleOrdenCompraDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminación física de un registro de Detalle de Orden de Compra.' })
  @ApiParam({ name: 'id', description: 'ID del detalle de orden de compra a eliminar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Detalle de orden de compra eliminado definitivamente.' })
  @ApiResponse({ status: 404, description: 'Detalle de orden de compra no encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}


// 📝 Recomendación para la Relación Padre-Hijo
// Dado que DetalleOrdenCompra pertenece a una OrdenCompra, es muy común tener un endpoint anidado para obtener solo los detalles de una orden específica:

// TypeScript

// Opción de Endpoint Anidado para el controlador de Ordenes de Compra:
// GET /ordenes-compra/:idOrden/detalles
// Si deciden implementar un endpoint así en el futuro, deberán documentarlo con @ApiParam para el idOrden y @ApiOperation.

