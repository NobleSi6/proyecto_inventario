// src/inventario/inventario.controller.ts

import { Controller, Post, Body, HttpCode, HttpStatus, Get, Param, ParseIntPipe } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemInventario } from './item-inventario.entity';

@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createItemDto: CreateItemDto) {
    return this.inventarioService.create(createItemDto);
  }

  //  NUEVA FUNCIÓN: GET para obtener la lista completa del inventario
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ItemInventario[]> {
    return this.inventarioService.findAll();
  }

   //NUEVO ENDPOINT: Buscar por ID
  // La ruta es /inventario/:id
  @Get(':id') 
  @HttpCode(HttpStatus.OK)
  // Usamos ParseIntPipe para asegurar que el :id es un número entero
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ItemInventario> {
    return this.inventarioService.findOne(id);
  }
}