import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { StockAlmacenService } from './stock-almacen.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('stock-almacen')
export class StockAlmacenController {
  constructor(private readonly service: StockAlmacenService) {}

  @Post()
  create(@Body() dto: CreateStockDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query('id_material') id_material?: string,
    @Query('id_almacen') id_almacen?: string,
    @Query('activo') activo?: string,
    @Query('dispMin') dispMin?: string,
    @Query('dispMax') dispMax?: string,
    @Query('resMin') resMin?: string,
    @Query('resMax') resMax?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.service.findAll({
      id_material: id_material ? Number(id_material) : undefined,
      id_almacen: id_almacen ? Number(id_almacen) : undefined,
      activo: typeof activo === 'string' ? activo === 'true' : undefined,
      dispMin: dispMin ? Number(dispMin) : undefined,
      dispMax: dispMax ? Number(dispMax) : undefined,
      resMin: resMin ? Number(resMin) : undefined,
      resMax: resMax ? Number(resMax) : undefined,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStockDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id/def')
  hardDelete(@Param('id', ParseIntPipe) id: number) {
    return this.service.hardDelete(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id);
  }
}