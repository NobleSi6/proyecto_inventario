import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DetalleEntradaService } from './detalle_entrada.service';
import { CreateDetalleEntradaDto } from './dto/create-detalle_entrada.dto';
import { UpdateDetalleEntradaDto } from './dto/update-detalle_entrada.dto';
// Importamos los decoradores de Swagger
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('detalle-entrada')
@Controller('detalle-entrada')
export class DetalleEntradaController {
  constructor(private service: DetalleEntradaService) {}

  @Post()
  @ApiOperation({ summary: 'Agrega un material como detalle a una Entrada de Inventario existente.' })
  @ApiResponse({ status: 201, description: 'Detalle de entrada creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos o clave foránea no existente.' })
  @ApiResponse({ status: 404, description: 'Entrada o Material no encontrado (FK error).' })
  create(@Body() dto: CreateDetalleEntradaDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los registros de detalles de entradas de inventario.' })
  @ApiResponse({ status: 200, description: 'Lista de detalles de entrada.' })
  findAll() {
    // Nota: Para APIs en producción, se recomienda agregar paginación (ApiQuery) aquí.
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene los detalles de un registro de Detalle de Entrada por su ID.' })
  @ApiParam({ name: 'id', description: 'ID del detalle de entrada.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Detalle de entrada encontrado.' })
  @ApiResponse({ status: 404, description: 'Detalle de entrada no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza parcial o totalmente un registro de Detalle de Entrada.' })
  @ApiParam({ name: 'id', description: 'ID del detalle de entrada a actualizar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Detalle de entrada actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Detalle de entrada no encontrado.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDetalleEntradaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminación física de un registro de Detalle de Entrada.' })
  @ApiParam({ name: 'id', description: 'ID del detalle de entrada a eliminar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Detalle de entrada eliminado definitivamente.' })
  @ApiResponse({ status: 404, description: 'Detalle de entrada no encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
