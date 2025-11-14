import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';

@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDto: CreateProveedorDto) {
    return this.proveedoresService.create(createDto);
  }

  @Get()
  findAll(@Query('activo') activo: string) {
    // Permite consultar activos (true) o inactivos (false)
    const showActive = activo !== 'false';
    return this.proveedoresService.findAll(showActive);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proveedoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateProveedorDto) {
    return this.proveedoresService.update(+id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK) 
  remove(@Param('id') id: string) {
    return this.proveedoresService.remove(+id);
  }
}