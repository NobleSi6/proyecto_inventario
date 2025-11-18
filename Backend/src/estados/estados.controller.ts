import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { Estado } from './estado.entity'; // Asegúrate de importar la entidad

@Controller('estados')
export class EstadosController {
  constructor(private readonly estadosService: EstadosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDto: CreateEstadoDto): Promise<Estado> { // Tipificado
    return this.estadosService.create(createDto);
  }

  @Get()
  findAll(): Promise<Estado[]> { // Tipificado
    return this.estadosService.findAll();
  }

  @Get(':id')
  // 🚨 CORRECCIÓN: Usamos ParseIntPipe
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Estado> { 
    return this.estadosService.findOne(id);
  }

  @Patch(':id')
  // 🚨 CORRECCIÓN: Usamos ParseIntPipe
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateDto: UpdateEstadoDto,
  ): Promise<Estado> {
    return this.estadosService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  // 🚨 CORRECCIÓN: Usamos ParseIntPipe
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> { // Soft Delete
    return this.estadosService.remove(id);
  }
  
  // 🚨 ADICIÓN: Endpoint para Borrado Permanente (Hard Delete)
  // Es clave separarlo para prevenir eliminaciones accidentales.
  @Delete('permanent/:id') 
  @HttpCode(HttpStatus.NO_CONTENT)
  hardRemove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.estadosService.hardRemove(id);
  }
}