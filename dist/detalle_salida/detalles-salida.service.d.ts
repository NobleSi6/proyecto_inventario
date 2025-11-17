import { Repository } from 'typeorm';
import { DetalleSalida } from './detalle-salida.entity';
import { CreateDetalleSalidaDto } from './dto/create-detalle-salida.dto';
import { UpdateDetalleSalidaDto } from './dto/update-detalle-salida.dto';
import { CreateManyDetallesDto } from './dto/create-many-detalles.dto';
export declare class DetallesSalidaService {
    private readonly repo;
    constructor(repo: Repository<DetalleSalida>);
    create(dto: CreateDetalleSalidaDto): Promise<DetalleSalida>;
    createMany(payload: CreateManyDetallesDto): Promise<DetalleSalida[]>;
    findAll(opts?: {
        id_salida?: number;
        id_material?: number;
        activo?: boolean;
        page?: number;
        limit?: number;
    }): Promise<{
        data: DetalleSalida[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id_detalle_salida: number): Promise<DetalleSalida>;
    update(id_detalle_salida: number, dto: UpdateDetalleSalidaDto): Promise<DetalleSalida>;
    remove(id_detalle_salida: number): Promise<void>;
    restore(id_detalle_salida: number): Promise<DetalleSalida>;
    hardDelete(id_detalle_salida: number): Promise<void>;
}
