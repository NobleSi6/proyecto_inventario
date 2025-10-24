import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntradasInventarioService } from './entradas_inventario.service';
import { CreateEntradasInventarioDto } from './dto/create-entradas_inventario.dto';
import { UpdateEntradasInventarioDto } from './dto/update-entradas_inventario.dto';

@Controller('entradas-inventario')
export class EntradasInventarioController {
  constructor(private readonly entradasInventarioService: EntradasInventarioService) {}

  @Post()
  create(@Body() createEntradasInventarioDto: CreateEntradasInventarioDto) {
    return this.entradasInventarioService.create(createEntradasInventarioDto);
  }

  @Get()
  findAll() {
    return this.entradasInventarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entradasInventarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntradasInventarioDto: UpdateEntradasInventarioDto) {
    return this.entradasInventarioService.update(+id, updateEntradasInventarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entradasInventarioService.remove(+id);
  }
}
