import { CreateOrdenCompraDto } from './dto/create-ordenes_compra.dto';
import { Repository } from 'typeorm';
import { OrdenCompra } from './entities/ordenes_compra.entity';
export declare class OrdenesCompraService {
    private repo;
    constructor(repo: Repository<OrdenCompra>);
    create(dto: CreateOrdenCompraDto): Promise<OrdenCompra>;
    findAll(): Promise<OrdenCompra[]>;
    findOne(id: number): Promise<OrdenCompra | null>;
    update(id: number, dto: CreateOrdenCompraDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
