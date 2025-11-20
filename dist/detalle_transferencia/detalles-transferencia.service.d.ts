import { Repository } from 'typeorm';
import { DetalleTransferencia } from './detalle-transferencia.entity';
import { CreateDetalleTransferenciaDto } from './dto/create-detalle-transferencia.dto';
import { UpdateDetalleTransferenciaDto } from './dto/update-detalle-transferencia.dto';
import { CreateManyDetallesTransferenciaDto } from './dto/create-many-detalles-transferencia.dto';
export declare class DetallesTransferenciaService {
    private readonly repo;
    constructor(repo: Repository<DetalleTransferencia>);
    create(dto: CreateDetalleTransferenciaDto): Promise<DetalleTransferencia>;
    createMany(payload: CreateManyDetallesTransferenciaDto): Promise<DetalleTransferencia[]>;
    findAll(opts?: {
        id_transferencia?: number;
        id_material?: number;
        activo?: boolean;
        page?: number;
        limit?: number;
    }): Promise<{
        data: DetalleTransferencia[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id_detalle_transferencia: number): Promise<DetalleTransferencia>;
    update(id_detalle_transferencia: number, dto: UpdateDetalleTransferenciaDto): Promise<DetalleTransferencia>;
    remove(id_detalle_transferencia: number): Promise<void>;
    restore(id_detalle_transferencia: number): Promise<DetalleTransferencia>;
    hardDelete(id_detalle_transferencia: number): Promise<void>;
}
