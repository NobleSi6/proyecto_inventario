import { EntradasInventarioService } from './entradas_inventario.service';
import { CreateEntradaInventarioDto } from './dto/create-entradas_inventario.dto';
import { UpdateEntradaInventarioDto } from './dto/update-entradas_inventario.dto';
export declare class EntradasInventarioController {
    private readonly service;
    constructor(service: EntradasInventarioService);
    create(dto: CreateEntradaInventarioDto): Promise<import("./entities/entradas_inventario.entity").EntradaInventario>;
    findAll(): Promise<import("./entities/entradas_inventario.entity").EntradaInventario[]>;
    findOne(id: number): Promise<import("./entities/entradas_inventario.entity").EntradaInventario | null>;
    update(id: number, dto: UpdateEntradaInventarioDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
