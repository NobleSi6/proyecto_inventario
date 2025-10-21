import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { DetallesTransferenciaService } from './detalles-transferencia.service';
import { CreateDetalleTransferenciaDto } from './dto/create-detalle-transferencia.dto';
import { UpdateDetalleTransferenciaDto } from './dto/update-detalle-transferencia.dto';
import { CreateManyDetallesTransferenciaDto } from './dto/create-many-detalles-transferencia.dto';

@Controller('detalles-transferencia')
export class DetallesTransferenciaController {
  constructor(private readonly service: DetallesTransferenciaService) {}

  @Post()
  create(@Body() dto: CreateDetalleTransferenciaDto) {
    return this.service.create(dto);
  }

  @Post('bulk')
  createMany(@Body() payload: CreateManyDetallesTransferenciaDto) {
    return this.service.createMany(payload);
  }

  @Get()
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
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDetalleTransferenciaDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id/def')
  hardDelete(@Param('id') id: string) {
    return this.service.hardDelete(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.service.restore(Number(id));
  }
}