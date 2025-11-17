import { Repository } from 'typeorm';
import { Almacen } from './almacen.entity';
import { CreateAlmacenDto } from './dto/create-almacen.dto';
import { UpdateAlmacenDto } from './dto/update-almacen.dto';
export declare class AlmacenesService {
    private readonly repo;
    constructor(repo: Repository<Almacen>);
    create(dto: CreateAlmacenDto): Promise<Almacen>;
    findAll(opts?: {
        q?: string;
        ciudad?: string;
        responsable?: number;
        activo?: boolean;
        page?: number;
        limit?: number;
    }): Promise<{
        data: Almacen[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id_almacen: number): Promise<Almacen>;
    update(id_almacen: number, dto: UpdateAlmacenDto): Promise<Almacen>;
    remove(id_almacen: number): Promise<void>;
    restore(id_almacen: number): Promise<Almacen>;
    hardDelete(id_almacen: number): Promise<void>;
}
