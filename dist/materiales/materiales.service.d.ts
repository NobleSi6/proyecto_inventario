import { Repository } from 'typeorm';
import { Material } from './material.entity';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
export declare class MaterialesService {
    private readonly repo;
    constructor(repo: Repository<Material>);
    create(dto: CreateMaterialDto): Promise<Material>;
    findAll(opts?: {
        q?: string;
        id_categoria?: number;
        id_unidad?: number;
        precioMin?: number;
        precioMax?: number;
        activo?: boolean;
        page?: number;
        limit?: number;
    }): Promise<{
        data: Material[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id_material: number): Promise<Material>;
    update(id_material: number, dto: UpdateMaterialDto): Promise<Material>;
    remove(id_material: number): Promise<void>;
    restore(id_material: number): Promise<Material>;
    hardDelete(id_material: number): Promise<void>;
}
