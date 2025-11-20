import { StockAlmacenService } from './stock-almacen.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
export declare class StockAlmacenController {
    private readonly service;
    constructor(service: StockAlmacenService);
    create(dto: CreateStockDto): Promise<import("./stock-almacen.entity").StockAlmacen>;
    findAll(id_material?: string, id_almacen?: string, activo?: string, dispMin?: string, dispMax?: string, resMin?: string, resMax?: string, page?: string, limit?: string): Promise<{
        data: import("./stock-almacen.entity").StockAlmacen[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number): Promise<import("./stock-almacen.entity").StockAlmacen>;
    update(id: number, dto: UpdateStockDto): Promise<import("./stock-almacen.entity").StockAlmacen>;
    hardDelete(id: number): Promise<void>;
    remove(id: number): Promise<void>;
    restore(id: number): Promise<import("./stock-almacen.entity").StockAlmacen>;
}
