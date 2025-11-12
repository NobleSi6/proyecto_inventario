import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrdenCompraDto } from './dto/create-ordenes_compra.dto';
import { UpdateOrdenesCompraDto } from './dto/update-ordenes_compra.dto';
import { Repository } from 'typeorm';
import { OrdenCompra } from './entities/ordenes_compra.entity';

@Injectable()
export class OrdenesCompraService {
  constructor(@InjectRepository(OrdenCompra) private repo: Repository<OrdenCompra>) {}

  create(dto: CreateOrdenCompraDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id_orden_compra: id } });
  }

  update(id: number, dto: UpdateOrdenesCompraDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
