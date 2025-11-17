import { CreateDetalleEntradaDto } from './dto/create-detalle_entrada.dto';
import { UpdateDetalleEntradaDto } from './dto/update-detalle_entrada.dto';
import { DetalleEntrada } from './entities/detalle_entrada.entity';
import { Repository } from 'typeorm';
export declare class DetalleEntradaService {
    private repo;
    constructor(repo: Repository<DetalleEntrada>);
    create(dto: CreateDetalleEntradaDto): Promise<DetalleEntrada>;
    findAll(): Promise<DetalleEntrada[]>;
    findOne(id: number): Promise<DetalleEntrada | null>;
    update(id: number, dto: UpdateDetalleEntradaDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
