import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleEntradaService } from './detalle_entrada.service';
import { CreateDetalleEntradaDto } from './dto/create-detalle_entrada.dto';
import { UpdateDetalleEntradaDto } from './dto/update-detalle_entrada.dto';

@Controller('detalle-entrada')
export class DetalleEntradaController {
  constructor(private service: DetalleEntradaService) {}

  @Post()
  create(@Body() dto: CreateDetalleEntradaDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateDetalleEntradaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
