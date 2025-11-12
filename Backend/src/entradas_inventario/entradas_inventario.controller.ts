import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EntradasInventarioService } from './entradas_inventario.service';
import { CreateEntradaInventarioDto } from './dto/create-entradas_inventario.dto';
import { UpdateEntradaInventarioDto } from './dto/update-entradas_inventario.dto';
// Importamos los decoradores de Swagger necesarios
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('entradas-inventario')
@Controller('entradas-inventario')
export class EntradasInventarioController {
  constructor(private readonly service: EntradasInventarioService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo registro de Entrada de Inventario (Cabecera).' })
  @ApiResponse({ status: 201, description: 'Entrada de inventario creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos o FKs inexistentes.' })
  create(@Body() dto: CreateEntradaInventarioDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene una lista de todas las cabeceras de Entradas de Inventario.' })
  @ApiResponse({ status: 200, description: 'Lista de entradas de inventario.' })
  findAll() {
    // Nota: Se recomienda agregar paginación (ApiQuery) si el número de registros es grande.
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene los detalles de una Entrada de Inventario por su ID.' })
  @ApiParam({ name: 'id', description: 'ID de la cabecera de entrada de inventario.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Entrada de inventario encontrada.' })
  @ApiResponse({ status: 404, description: 'Entrada de inventario no encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza parcial o totalmente una Entrada de Inventario (Cabecera).' })
  @ApiParam({ name: 'id', description: 'ID de la cabecera de entrada a actualizar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Entrada de inventario actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Entrada de inventario no encontrada.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEntradaInventarioDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminación física de una Entrada de Inventario (Cabecera). Esto debería eliminar los detalles por CASCADE en la BD.' })
  @ApiParam({ name: 'id', description: 'ID de la entrada de inventario a eliminar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Entrada de inventario eliminada definitivamente.' })
  @ApiResponse({ status: 404, description: 'Entrada de inventario no encontrada.' })
  @ApiResponse({ status: 409, description: 'Conflicto: No se puede eliminar por dependencia de FK (aunque es poco probable en una cabecera transaccional).' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}