import { DetalleOrdenCompraService } from './detalle_orden_compra.service';
import { CreateDetalleOrdenCompraDto } from './dto/create-detalle_orden_compra.dto';
import { UpdateDetalleOrdenCompraDto } from './dto/update-detalle_orden_compra.dto';
export declare class DetalleOrdenCompraController {
    private service;
    constructor(service: DetalleOrdenCompraService);
    create(dto: CreateDetalleOrdenCompraDto): Promise<import("./entities/detalle_orden_compra.entity").DetalleOrdenCompra>;
    findAll(): Promise<import("./entities/detalle_orden_compra.entity").DetalleOrdenCompra[]>;
    findOne(id: number): Promise<import("./entities/detalle_orden_compra.entity").DetalleOrdenCompra | null>;
    update(id: number, dto: UpdateDetalleOrdenCompraDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
