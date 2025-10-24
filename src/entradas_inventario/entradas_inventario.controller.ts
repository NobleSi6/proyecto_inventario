import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntradasInventarioService } from './entradas_inventario.service';
import { CreateEntradaInventarioDto } from './dto/create-entradas_inventario.dto';
import { UpdateEntradaInventarioDto } from './dto/update-entradas_inventario.dto';

@Controller('entradas-inventario')
export class EntradasInventarioController {
  constructor(private readonly service: EntradasInventarioService) {}

  @Post()
  create(@Body() dto: CreateEntradaInventarioDto) {
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
  update(@Param('id') id: number, @Body() dto: UpdateEntradaInventarioDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
