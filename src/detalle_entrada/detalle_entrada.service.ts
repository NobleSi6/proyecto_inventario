import { Injectable } from '@nestjs/common';
import { CreateDetalleEntradaDto } from './dto/create-detalle_entrada.dto';
import { UpdateDetalleEntradaDto } from './dto/update-detalle_entrada.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleEntrada } from './entities/detalle_entrada.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetalleEntradaService {
  constructor(@InjectRepository(DetalleEntrada) private repo: Repository<DetalleEntrada>) {}

  create(dto: CreateDetalleEntradaDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id_detalle_entrada: id } });
  }

  update(id: number, dto: UpdateDetalleEntradaDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
