import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { SalidasService } from './salidas.service';
import { CreateSalidaDto } from './dto/create-salida.dto';
import { UpdateSalidaDto } from './dto/update-salida.dto';

@Controller('salidas')
export class SalidasController {
  constructor(private readonly service: SalidasService) {}

  @Post()
  create(@Body() dto: CreateSalidaDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query('q') q?: string,
    @Query('id_almacen') id_almacen?: string,
    @Query('id_proyecto') id_proyecto?: string,
    @Query('desde') desde?: string,
    @Query('hasta') hasta?: string,
    @Query('activo') activo?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.service.findAll({
      q,
      id_almacen: id_almacen ? Number(id_almacen) : undefined,
      id_proyecto: id_proyecto ? Number(id_proyecto) : undefined,
      desde,
      hasta,
      activo: typeof activo === 'string' ? activo === 'true' : undefined,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSalidaDto) {
    return this.service.update(id, dto);
  }

  // ⚠️ PONER ESTE ANTES del @Delete(':id')
  @Delete(':id/def')
  hardDelete(@Param('id', ParseIntPipe) id: number) {
    return this.service.hardDelete(id);
  }
 
  //Y el siguiente es una eliminación lógica🤏

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  // Restaura una salida eliminada lógicamente (activo = true de nuevo)

  @Patch(':id/restore')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id);
  }
}