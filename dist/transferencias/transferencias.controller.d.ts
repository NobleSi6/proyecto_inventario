import { TransferenciasService } from './transferencias.service';
import { CreateTransferenciaDto } from './dto/create-transferencia.dto';
import { UpdateTransferenciaDto } from './dto/update-transferencia.dto';
export declare class TransferenciasController {
    private readonly service;
    constructor(service: TransferenciasService);
    create(dto: CreateTransferenciaDto): Promise<import("./transferencia.entity").Transferencia>;
    findAll(q?: string, id_almacen_origen?: string, id_almacen_destino?: string, id_empleado_autoriza?: string, id_empleado_solicitante?: string, estado?: string, desde?: string, hasta?: string, recibidaDesde?: string, recibidaHasta?: string, activo?: string, page?: string, limit?: string): Promise<{
        data: import("./transferencia.entity").Transferencia[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number): Promise<import("./transferencia.entity").Transferencia>;
    update(id: number, dto: UpdateTransferenciaDto): Promise<import("./transferencia.entity").Transferencia>;
    hardDelete(id: number): Promise<void>;
    remove(id: number): Promise<void>;
    restore(id: number): Promise<import("./transferencia.entity").Transferencia>;
}
