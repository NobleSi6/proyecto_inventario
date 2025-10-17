import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { DetallesSalidaService } from './detalles-salida.service';
import { CreateDetalleSalidaDto } from './dto/create-detalle-salida.dto';
import { UpdateDetalleSalidaDto } from './dto/update-detalle-salida.dto';
import { CreateManyDetallesDto } from './dto/create-many-detalles.dto';

@Controller('detalles-salida')
export class DetallesSalidaController {
  constructor(private readonly service: DetallesSalidaService) {}

  @Post()
  create(@Body() dto: CreateDetalleSalidaDto) {
    return this.service.create(dto);
  }

  @Post('bulk')
  createMany(@Body() payload: CreateManyDetallesDto) {
    return this.service.createMany(payload);
  }

  @Get()
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
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDetalleSalidaDto) {
    return this.service.update(Number(id), dto);
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