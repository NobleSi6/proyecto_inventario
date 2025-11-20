import { DetallesSalidaService } from './detalles-salida.service';
import { CreateDetalleSalidaDto } from './dto/create-detalle-salida.dto';
import { UpdateDetalleSalidaDto } from './dto/update-detalle-salida.dto';
import { CreateManyDetallesDto } from './dto/create-many-detalles.dto';
export declare class DetallesSalidaController {
    private readonly service;
    constructor(service: DetallesSalidaService);
    create(dto: CreateDetalleSalidaDto): Promise<import("./detalle-salida.entity").DetalleSalida>;
    createMany(payload: CreateManyDetallesDto): Promise<import("./detalle-salida.entity").DetalleSalida[]>;
    findAll(id_salida?: string, id_material?: string, activo?: string, page?: string, limit?: string): Promise<{
        data: import("./detalle-salida.entity").DetalleSalida[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./detalle-salida.entity").DetalleSalida>;
    update(id: string, dto: UpdateDetalleSalidaDto): Promise<import("./detalle-salida.entity").DetalleSalida>;
    hardDelete(id: string): Promise<void>;
    remove(id: string): Promise<void>;
    restore(id: string): Promise<import("./detalle-salida.entity").DetalleSalida>;
}
