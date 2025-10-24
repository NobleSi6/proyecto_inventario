import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { OrdenesCompraService } from './ordenes_compra.service';
import { CreateOrdenesCompraDto } from './dto/create-ordenes_compra.dto';
import { UpdateOrdenesCompraDto } from './dto/update-ordenes_compra.dto';
import { DetalleOrdenCompraService } from 'src/detalle_orden_compra/detalle_orden_compra.service';
import { CreateDetalleOrdenCompraDto } from 'src/detalle_orden_compra/dto/create-detalle_orden_compra.dto';
import { UpdateDetalleOrdenCompraDto } from 'src/detalle_orden_compra/dto/update-detalle_orden_compra.dto';

@Controller('ordeneses-compra')
export class OrdenesCompraController {
  constructor(
    private readonly ordenesesCompraService: OrdenesCompraService,
    private readonly detalleOrdenesCompraService: DetalleOrdenCompraService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createOrdenesCompraDto: CreateOrdenesCompraDto) {
    return this.ordenesesCompraService.create(createOrdenesCompraDto);
  }

  @Get()
  findAll() {
    return this.ordenesesCompraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordenesesCompraService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdenesCompraDto: UpdateOrdenesCompraDto) {
    return this.ordenesesCompraService.update(+id, updateOrdenesCompraDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.ordenesesCompraService.remove(+id);
  }


  // Endpoints para detalles
  @Post(':id/detalles')
  @HttpCode(HttpStatus.CREATED)
  createDetalle(
    @Param('id') id: string,
    @Body() createDetalleDto: CreateDetalleOrdenCompraDto,
  ) {
    return this.detalleOrdenesCompraService.create(+id, createDetalleDto);
  }

  @Get(':id/detalles')
  findDetalles(@Param('id') id: string) {
    return this.detalleOrdenesCompraService.findByOrdenes(+id);
  }

  @Patch('detalles/:detalleId')
  updateDetalle(
    @Param('detalleId') detalleId: string,
    @Body() updateDetalleDto: UpdateDetalleOrdenCompraDto,
  ) {
    return this.detalleOrdenesCompraService.update(+detalleId, updateDetalleDto);
  }

  @Delete('detalles/:detalleId')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeDetalle(@Param('detalleId') detalleId: string) {
    return this.detalleOrdenesCompraService.remove(+detalleId);
  }
}