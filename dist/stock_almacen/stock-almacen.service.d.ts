import { Repository } from 'typeorm';
import { StockAlmacen } from './stock-almacen.entity';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
export declare class StockAlmacenService {
    private readonly repo;
    constructor(repo: Repository<StockAlmacen>);
    create(dto: CreateStockDto): Promise<StockAlmacen>;
    findAll(opts?: {
        id_material?: number;
        id_almacen?: number;
        activo?: boolean;
        dispMin?: number;
        dispMax?: number;
        resMin?: number;
        resMax?: number;
        page?: number;
        limit?: number;
    }): Promise<{
        data: StockAlmacen[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id_stock: number): Promise<StockAlmacen>;
    update(id_stock: number, dto: UpdateStockDto): Promise<StockAlmacen>;
    remove(id_stock: number): Promise<void>;
    restore(id_stock: number): Promise<StockAlmacen>;
    hardDelete(id_stock: number): Promise<void>;
}
