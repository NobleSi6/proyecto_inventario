import { Injectable } from '@nestjs/common';
import { CreateOrdenesCompraDto } from './dto/create-ordenes_compra.dto';
import { UpdateOrdenesCompraDto } from './dto/update-ordenes_compra.dto';

@Injectable()
export class OrdenesCompraService {
  create(createOrdenesCompraDto: CreateOrdenesCompraDto) {
    return 'This action adds a new ordenesCompra';
  }

  findAll() {
    return `This action returns all ordenesCompra`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordenesCompra`;
  }

  update(id: number, updateOrdenesCompraDto: UpdateOrdenesCompraDto) {
    return `This action updates a #${id} ordenesCompra`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordenesCompra`;
  }
}
