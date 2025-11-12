import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { OrdenesCompraService } from './ordenes_compra.service';
import { CreateOrdenCompraDto } from './dto/create-ordenes_compra.dto';
import { UpdateOrdenesCompraDto } from './dto/update-ordenes_compra.dto'; // Asumo que existe un UpdateOrdenCompraDto (PartialType)
// Importamos los decoradores de Swagger necesarios
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('ordenes-compra')
@Controller('ordenes-compra')
export class OrdenesCompraController {
  constructor(private service: OrdenesCompraService) {}

  @Post()
  @ApiOperation({ summary: 'Crea una nueva Orden de Compra (Cabecera).' })
  @ApiResponse({ status: 201, description: 'Orden de Compra creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos o FKs inexistentes.' })
  create(@Body() dto: CreateOrdenCompraDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene una lista de todas las Ordenes de Compra.' })
  @ApiResponse({ status: 200, description: 'Lista de órdenes de compra.' })
  findAll() {
    // Nota: Se recomienda agregar paginación (ApiQuery) si el número de registros es grande.
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene los detalles de una Orden de Compra por su ID.' })
  @ApiParam({ name: 'id', description: 'ID de la orden de compra.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Orden de compra encontrada.' })
  @ApiResponse({ status: 404, description: 'Orden de compra no encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number) { // Agregado ParseIntPipe
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza parcial o totalmente una Orden de Compra (Cabecera).' })
  @ApiParam({ name: 'id', description: 'ID de la orden de compra a actualizar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Orden de compra actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Orden de compra no encontrada.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOrdenesCompraDto) { // Asumo UpdateOrdenCompraDto
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Para un borrado exitoso, 204 No Content es común
  @ApiOperation({ summary: 'Eliminación física (definitiva) de una Orden de Compra.' })
  @ApiParam({ name: 'id', description: 'ID de la orden de compra a eliminar.', type: Number, example: 1 })
  @ApiResponse({ status: 204, description: 'Orden de compra eliminada definitivamente.' })
  @ApiResponse({ status: 404, description: 'Orden de compra no encontrada.' })
  @ApiResponse({ status: 409, description: 'Conflicto: No se puede eliminar por dependencia de detalles existentes.' })
  remove(@Param('id', ParseIntPipe) id: number) { // Agregado ParseIntPipe
    return this.service.remove(id);
  }
}