import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleOrdenCompraService } from './detalle_orden_compra.service';
import { CreateDetalleOrdenCompraDto } from './dto/create-detalle_orden_compra.dto';
import { UpdateDetalleOrdenCompraDto } from './dto/update-detalle_orden_compra.dto';

@Controller('detalle-orden-compra')
export class DetalleOrdenCompraController {
  constructor(private readonly detalleOrdenCompraService: DetalleOrdenCompraService) {}

  @Post()
  create(@Body() createDetalleOrdenCompraDto: CreateDetalleOrdenCompraDto) {
    return this.detalleOrdenCompraService.create(createDetalleOrdenCompraDto);
  }

  @Get()
  findAll() {
    return this.detalleOrdenCompraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleOrdenCompraService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleOrdenCompraDto: UpdateDetalleOrdenCompraDto) {
    return this.detalleOrdenCompraService.update(+id, updateDetalleOrdenCompraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleOrdenCompraService.remove(+id);
  }
}
