import { Repository } from 'typeorm';
import { HistorialMovimiento } from './historial-movimiento.entity';
import { CreateHistorialMovimientoDto } from './dto/create-historial-movimiento.dto';
import { UpdateHistorialMovimientoDto } from './dto/update-historial-movimiento.dto';
export declare class HistorialMovimientosService {
    private readonly repo;
    constructor(repo: Repository<HistorialMovimiento>);
    create(dto: CreateHistorialMovimientoDto): Promise<HistorialMovimiento>;
    findAll(opts?: {
        q?: string;
        tipo?: string;
        id_material?: number;
        id_almacen?: number;
        id_empleado?: number;
        desde?: string;
        hasta?: string;
        activo?: boolean;
        page?: number;
        limit?: number;
    }): Promise<{
        data: HistorialMovimiento[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id_movimiento: number): Promise<HistorialMovimiento>;
    update(id_movimiento: number, dto: UpdateHistorialMovimientoDto): Promise<HistorialMovimiento>;
    remove(id_movimiento: number): Promise<void>;
    restore(id_movimiento: number): Promise<HistorialMovimiento>;
    hardDelete(id_movimiento: number): Promise<void>;
}
