import { Injectable } from '@nestjs/common';
import { CreateDetalleOrdenCompraDto } from './dto/create-detalle_orden_compra.dto';
import { UpdateDetalleOrdenCompraDto } from './dto/update-detalle_orden_compra.dto';

@Injectable()
export class DetalleOrdenCompraService {
  create(createDetalleOrdenCompraDto: CreateDetalleOrdenCompraDto) {
    return 'This action adds a new detalleOrdenCompra';
  }

  findAll() {
    return `This action returns all detalleOrdenCompra`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleOrdenCompra`;
  }

  update(id: number, updateDetalleOrdenCompraDto: UpdateDetalleOrdenCompraDto) {
    return `This action updates a #${id} detalleOrdenCompra`;
  }

  remove(id: number) {
    return `This action removes a #${id} detalleOrdenCompra`;
  }
}
