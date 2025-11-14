import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query, ParseIntPipe } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { Proveedor } from './proveedor.entity'; // Importamos la entidad para tipificar

@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDto: CreateProveedorDto): Promise<Proveedor> { // Tipificado
    return this.proveedoresService.create(createDto);
  }

  @Get()
  findAll(@Query('activo') activo: string): Promise<Proveedor[]> { // Tipificado
    // Convierte el query string a booleano, usa 'true' por defecto si no está definido o es cualquier otra cosa.
    const showActive = activo === 'false' ? false : true;
    return this.proveedoresService.findAll(showActive);
  }

  @Get(':id')
  // 🚨 CORRECCIÓN: Usamos ParseIntPipe
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Proveedor> { // Tipificado
    return this.proveedoresService.findOne(id);
  }

  @Patch(':id')
  // 🚨 CORRECCIÓN: Usamos ParseIntPipe
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateDto: UpdateProveedorDto,
  ): Promise<Proveedor> { // Tipificado
    return this.proveedoresService.update(id, updateDto);
  }

  @Delete(':id')
  // 🚨 CORRECCIÓN: Cambiamos a HttpStatus.NO_CONTENT (204)
  @HttpCode(HttpStatus.NO_CONTENT) 
  // 🚨 CORRECCIÓN: Usamos ParseIntPipe
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> { // Soft Delete
    return this.proveedoresService.remove(id);
  }
  
  // 🚨 ADICIÓN: Endpoint para Borrado Permanente (Hard Delete)
  @Delete('permanent/:id') 
  @HttpCode(HttpStatus.NO_CONTENT)
  hardRemove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.proveedoresService.hardRemove(id);
  }
}