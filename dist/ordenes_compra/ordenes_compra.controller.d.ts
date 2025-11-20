import { OrdenesCompraService } from './ordenes_compra.service';
import { CreateOrdenCompraDto } from './dto/create-ordenes_compra.dto';
export declare class OrdenesCompraController {
    private service;
    constructor(service: OrdenesCompraService);
    create(dto: CreateOrdenCompraDto): Promise<import("./entities/ordenes_compra.entity").OrdenCompra>;
    findAll(): Promise<import("./entities/ordenes_compra.entity").OrdenCompra[]>;
    findOne(id: number): Promise<import("./entities/ordenes_compra.entity").OrdenCompra | null>;
    update(id: number, dto: CreateOrdenCompraDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
