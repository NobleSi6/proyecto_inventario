import { DetalleEntradaService } from './detalle_entrada.service';
import { CreateDetalleEntradaDto } from './dto/create-detalle_entrada.dto';
import { UpdateDetalleEntradaDto } from './dto/update-detalle_entrada.dto';
export declare class DetalleEntradaController {
    private service;
    constructor(service: DetalleEntradaService);
    create(dto: CreateDetalleEntradaDto): Promise<import("./entities/detalle_entrada.entity").DetalleEntrada>;
    findAll(): Promise<import("./entities/detalle_entrada.entity").DetalleEntrada[]>;
    findOne(id: number): Promise<import("./entities/detalle_entrada.entity").DetalleEntrada | null>;
    update(id: number, dto: UpdateDetalleEntradaDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
