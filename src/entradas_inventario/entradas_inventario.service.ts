import { Injectable } from '@nestjs/common';
import { CreateEntradasInventarioDto } from './dto/create-entradas_inventario.dto';
import { UpdateEntradasInventarioDto } from './dto/update-entradas_inventario.dto';

@Injectable()
export class EntradasInventarioService {
  create(createEntradasInventarioDto: CreateEntradasInventarioDto) {
    return 'This action adds a new entradasInventario';
  }

  findAll() {
    return `This action returns all entradasInventario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} entradasInventario`;
  }

  update(id: number, updateEntradasInventarioDto: UpdateEntradasInventarioDto) {
    return `This action updates a #${id} entradasInventario`;
  }

  remove(id: number) {
    return `This action removes a #${id} entradasInventario`;
  }
}
