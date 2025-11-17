import { Repository } from 'typeorm';
import { Salida } from './salida.entity';
import { CreateSalidaDto } from './dto/create-salida.dto';
import { UpdateSalidaDto } from './dto/update-salida.dto';
export declare class SalidasService {
    private readonly repo;
    constructor(repo: Repository<Salida>);
    create(dto: CreateSalidaDto): Promise<Salida>;
    findAll(opts?: {
        q?: string;
        id_almacen?: number;
        id_proyecto?: number;
        desde?: string;
        hasta?: string;
        activo?: boolean;
        page?: number;
        limit?: number;
    }): Promise<{
        data: Salida[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id_salida: number): Promise<Salida>;
    update(id_salida: number, dto: UpdateSalidaDto): Promise<Salida>;
    remove(id_salida: number): Promise<void>;
    restore(id_salida: number): Promise<Salida>;
    hardDelete(id_salida: number): Promise<void>;
}
