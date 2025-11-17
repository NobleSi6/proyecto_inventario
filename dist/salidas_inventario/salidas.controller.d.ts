import { SalidasService } from './salidas.service';
import { CreateSalidaDto } from './dto/create-salida.dto';
import { UpdateSalidaDto } from './dto/update-salida.dto';
export declare class SalidasController {
    private readonly service;
    constructor(service: SalidasService);
    create(dto: CreateSalidaDto): Promise<import("./salida.entity").Salida>;
    findAll(q?: string, id_almacen?: string, id_proyecto?: string, desde?: string, hasta?: string, activo?: string, page?: string, limit?: string): Promise<{
        data: import("./salida.entity").Salida[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number): Promise<import("./salida.entity").Salida>;
    update(id: number, dto: UpdateSalidaDto): Promise<import("./salida.entity").Salida>;
    hardDelete(id: number): Promise<void>;
    remove(id: number): Promise<void>;
    restore(id: number): Promise<import("./salida.entity").Salida>;
}
