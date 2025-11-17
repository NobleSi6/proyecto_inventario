import { DetallesTransferenciaService } from './detalles-transferencia.service';
import { CreateDetalleTransferenciaDto } from './dto/create-detalle-transferencia.dto';
import { UpdateDetalleTransferenciaDto } from './dto/update-detalle-transferencia.dto';
import { CreateManyDetallesTransferenciaDto } from './dto/create-many-detalles-transferencia.dto';
export declare class DetallesTransferenciaController {
    private readonly service;
    constructor(service: DetallesTransferenciaService);
    create(dto: CreateDetalleTransferenciaDto): Promise<import("./detalle-transferencia.entity").DetalleTransferencia>;
    createMany(payload: CreateManyDetallesTransferenciaDto): Promise<import("./detalle-transferencia.entity").DetalleTransferencia[]>;
    findAll(id_transferencia?: string, id_material?: string, activo?: string, page?: string, limit?: string): Promise<{
        data: import("./detalle-transferencia.entity").DetalleTransferencia[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./detalle-transferencia.entity").DetalleTransferencia>;
    update(id: string, dto: UpdateDetalleTransferenciaDto): Promise<import("./detalle-transferencia.entity").DetalleTransferencia>;
    hardDelete(id: string): Promise<void>;
    remove(id: string): Promise<void>;
    restore(id: string): Promise<import("./detalle-transferencia.entity").DetalleTransferencia>;
}
