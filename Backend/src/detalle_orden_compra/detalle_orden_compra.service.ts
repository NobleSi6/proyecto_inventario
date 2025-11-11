import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdenCompra } from 'src/ordenes_compra/entities/ordenes_compra.entity';
import { Repository } from 'typeorm';
import { CreateDetalleOrdenCompraDto } from './dto/create-detalle_orden_compra.dto';
import { UpdateDetalleOrdenCompraDto } from './dto/update-detalle_orden_compra.dto';
import { DetalleOrdenCompra } from './entities/detalle_orden_compra.entity';

@Injectable()
export class DetalleOrdenCompraService {
  constructor(@InjectRepository(DetalleOrdenCompra) private repo: Repository<DetalleOrdenCompra>) {}

  create(dto: CreateDetalleOrdenCompraDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id_detalle: id } });
  }

  update(id: number, dto: UpdateDetalleOrdenCompraDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
