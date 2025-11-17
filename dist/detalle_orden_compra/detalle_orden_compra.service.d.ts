import { Repository } from 'typeorm';
import { CreateDetalleOrdenCompraDto } from './dto/create-detalle_orden_compra.dto';
import { UpdateDetalleOrdenCompraDto } from './dto/update-detalle_orden_compra.dto';
import { DetalleOrdenCompra } from './entities/detalle_orden_compra.entity';
export declare class DetalleOrdenCompraService {
    private repo;
    constructor(repo: Repository<DetalleOrdenCompra>);
    create(dto: CreateDetalleOrdenCompraDto): Promise<DetalleOrdenCompra>;
    findAll(): Promise<DetalleOrdenCompra[]>;
    findOne(id: number): Promise<DetalleOrdenCompra | null>;
    update(id: number, dto: UpdateDetalleOrdenCompraDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
