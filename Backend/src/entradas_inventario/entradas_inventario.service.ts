import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntradaInventario } from './entities/entradas_inventario.entity';
import { CreateEntradaInventarioDto } from './dto/create-entradas_inventario.dto';
import { UpdateEntradaInventarioDto } from './dto/update-entradas_inventario.dto';

@Injectable()
export class EntradasInventarioService {
  constructor(
    @InjectRepository(EntradaInventario)
    private repo: Repository<EntradaInventario>,
  ) {}

  create(dto: CreateEntradaInventarioDto) {
    const data = this.repo.create(dto);
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id_entrada: id } });
  }

  update(id: number, dto: UpdateEntradaInventarioDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
