import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { HistorialMovimientosService } from './historial-movimientos.service';
import { CreateHistorialMovimientoDto } from './dto/create-historial-movimiento.dto';
import { UpdateHistorialMovimientoDto } from './dto/update-historial-movimiento.dto';

@Controller('historial-movimientos')
export class HistorialMovimientosController {
  constructor(private readonly service: HistorialMovimientosService) {}

  @Post()
  create(@Body() dto: CreateHistorialMovimientoDto) {
    return this.service.create(dto);
  }

  @Get()
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateHistorialMovimientoDto) {
    return this.service.update(id, dto);
  }

  // Colocar antes del delete ':id'
  @Delete(':id/def')
  hardDelete(@Param('id', ParseIntPipe) id: number) {
    return this.service.hardDelete(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id);
  }
}