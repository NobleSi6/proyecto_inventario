import { Repository } from 'typeorm';
import { EntradaInventario } from './entities/entradas_inventario.entity';
import { CreateEntradaInventarioDto } from './dto/create-entradas_inventario.dto';
import { UpdateEntradaInventarioDto } from './dto/update-entradas_inventario.dto';
export declare class EntradasInventarioService {
    private repo;
    constructor(repo: Repository<EntradaInventario>);
    create(dto: CreateEntradaInventarioDto): Promise<EntradaInventario>;
    findAll(): Promise<EntradaInventario[]>;
    findOne(id: number): Promise<EntradaInventario | null>;
    update(id: number, dto: UpdateEntradaInventarioDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
