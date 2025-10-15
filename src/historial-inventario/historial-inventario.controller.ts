import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { HistorialInventarioService } from './historial-inventario.service';
// Asume la existencia de la entidad para el tipo de retorno
import { HistorialInventario } from './historial-inventario.entity';

@Controller('historial-inventario')
export class HistorialInventarioController {
  constructor(private readonly historialInventarioService: HistorialInventarioService) {}

  // SOLO CREATE: El historial no se actualiza ni se elimina
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createHistorialDto: CreateHistorialDto): Promise<HistorialInventario> {
    return this.historialInventarioService.create(createHistorialDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<HistorialInventario[]> {
    return this.historialInventarioService.findAll();
  }

  @Get(':id') 
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<HistorialInventario> {
    return this.historialInventarioService.findOne(id);
  }
  
  // Se omiten los endpoints PUT/DELETE porque el historial debe ser inmutable.
}