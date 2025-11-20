import { AlmacenesService } from './almacenes.service';
import { CreateAlmacenDto } from './dto/create-almacen.dto';
import { UpdateAlmacenDto } from './dto/update-almacen.dto';
export declare class AlmacenesController {
    private readonly service;
    constructor(service: AlmacenesService);
    create(dto: CreateAlmacenDto): Promise<import("./almacen.entity").Almacen>;
    findAll(q?: string, ciudad?: string, responsable?: string, activo?: string, page?: string, limit?: string): Promise<{
        data: import("./almacen.entity").Almacen[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number): Promise<import("./almacen.entity").Almacen>;
    update(id: number, dto: UpdateAlmacenDto): Promise<import("./almacen.entity").Almacen>;
    hardDelete(id: number): Promise<void>;
    remove(id: number): Promise<void>;
    restore(id: number): Promise<import("./almacen.entity").Almacen>;
}
