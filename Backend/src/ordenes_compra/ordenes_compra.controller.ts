import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { OrdenesCompraService } from './ordenes_compra.service';
import { CreateOrdenCompraDto } from './dto/create-ordenes_compra.dto';



@Controller('ordenes-compra')
export class OrdenesCompraController {
  constructor(private service: OrdenesCompraService) {}

  @Post()
  create(@Body() dto: CreateOrdenCompraDto) {
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
  update(@Param('id') id: number, @Body() dto: CreateOrdenCompraDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
