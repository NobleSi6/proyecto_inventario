import { Repository } from 'typeorm';
import { Transferencia } from './transferencia.entity';
import { CreateTransferenciaDto } from './dto/create-transferencia.dto';
import { UpdateTransferenciaDto } from './dto/update-transferencia.dto';
export declare class TransferenciasService {
    private readonly repo;
    constructor(repo: Repository<Transferencia>);
    create(dto: CreateTransferenciaDto): Promise<Transferencia>;
    findAll(opts?: {
        q?: string;
        id_almacen_origen?: number;
        id_almacen_destino?: number;
        id_empleado_autoriza?: number;
        id_empleado_solicitante?: number;
        estado?: number;
        desde?: string;
        hasta?: string;
        recibidaDesde?: string;
        recibidaHasta?: string;
        activo?: boolean;
        page?: number;
        limit?: number;
    }): Promise<{
        data: Transferencia[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id_transferencia: number): Promise<Transferencia>;
    update(id_transferencia: number, dto: UpdateTransferenciaDto): Promise<Transferencia>;
    remove(id_transferencia: number): Promise<void>;
    restore(id_transferencia: number): Promise<Transferencia>;
    hardDelete(id_transferencia: number): Promise<void>;
}
