import { MaterialesService } from './materiales.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
export declare class MaterialesController {
    private readonly service;
    constructor(service: MaterialesService);
    create(dto: CreateMaterialDto): Promise<import("./material.entity").Material>;
    findAll(q?: string, id_categoria?: string, id_unidad?: string, precioMin?: string, precioMax?: string, activo?: string, page?: string, limit?: string): Promise<{
        data: import("./material.entity").Material[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number): Promise<import("./material.entity").Material>;
    update(id: number, dto: UpdateMaterialDto): Promise<import("./material.entity").Material>;
    hardDelete(id: number): Promise<void>;
    remove(id: number): Promise<void>;
    restore(id: number): Promise<import("./material.entity").Material>;
}
