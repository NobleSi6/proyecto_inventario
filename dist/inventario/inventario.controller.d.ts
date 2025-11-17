import { InventarioService } from './inventario.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemInventario } from './item-inventario.entity';
export declare class InventarioController {
    private readonly inventarioService;
    constructor(inventarioService: InventarioService);
    create(createItemDto: CreateItemDto): Promise<ItemInventario>;
    findAll(): Promise<ItemInventario[]>;
    findOne(id: number): Promise<ItemInventario>;
}
