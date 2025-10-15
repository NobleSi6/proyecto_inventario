import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AlmacenService } from './almacen.service';
import { CreateAlmacenDto } from './dto/create-almacen.dto';
import { UpdateAlmacenDto } from './dto/update-almacen.dto';
// Asume la existencia de la entidad para el tipo de retorno
import { Almacen } from './almacen.entity';

@Controller('almacenes')
export class AlmacenController {
  constructor(private readonly almacenService: AlmacenService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAlmacenDto: CreateAlmacenDto): Promise<Almacen> {
    return this.almacenService.create(createAlmacenDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Almacen[]> {
    return this.almacenService.findAll();
  }

  @Get(':id') 
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Almacen> {
    return this.almacenService.findOne(id);
  }
  
  // Endpoint para actualizar
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAlmacenDto: UpdateAlmacenDto,
  ): Promise<Almacen> {
    return this.almacenService.update(id, updateAlmacenDto);
  }

  // Endpoint para eliminar
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content para eliminación exitosa
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.almacenService.delete(id);
  }
}