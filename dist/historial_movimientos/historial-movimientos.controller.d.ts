import { HistorialMovimientosService } from './historial-movimientos.service';
import { CreateHistorialMovimientoDto } from './dto/create-historial-movimiento.dto';
import { UpdateHistorialMovimientoDto } from './dto/update-historial-movimiento.dto';
export declare class HistorialMovimientosController {
    private readonly service;
    constructor(service: HistorialMovimientosService);
    create(dto: CreateHistorialMovimientoDto): Promise<import("./historial-movimiento.entity").HistorialMovimiento>;
    findAll(q?: string, tipo?: string, id_material?: string, id_almacen?: string, id_empleado?: string, desde?: string, hasta?: string, activo?: string, page?: string, limit?: string): Promise<{
        data: import("./historial-movimiento.entity").HistorialMovimiento[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number): Promise<import("./historial-movimiento.entity").HistorialMovimiento>;
    update(id: number, dto: UpdateHistorialMovimientoDto): Promise<import("./historial-movimiento.entity").HistorialMovimiento>;
    hardDelete(id: number): Promise<void>;
    remove(id: number): Promise<void>;
    restore(id: number): Promise<import("./historial-movimiento.entity").HistorialMovimiento>;
}
