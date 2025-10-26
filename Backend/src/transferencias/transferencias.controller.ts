import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { TransferenciasService } from './transferencias.service';
import { CreateTransferenciaDto } from './dto/create-transferencia.dto';
import { UpdateTransferenciaDto } from './dto/update-transferencia.dto';

@Controller('transferencias')
export class TransferenciasController {
  constructor(private readonly service: TransferenciasService) {}

  @Post()
  create(@Body() dto: CreateTransferenciaDto) {
    return this.service.create(dto);
  }

  @Get()
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTransferenciaDto) {
    return this.service.update(id, dto);
  }

  // ⚠️ Colocar antes del DELETE ':id'
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