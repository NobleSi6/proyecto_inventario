import { Repository } from 'typeorm';
import { ItemInventario } from './item-inventario.entity';
import { CreateItemDto } from './dto/create-item.dto';
export declare class InventarioService {
    private itemRepository;
    constructor(itemRepository: Repository<ItemInventario>);
    create(createItemDto: CreateItemDto): Promise<ItemInventario>;
    findAll(): Promise<ItemInventario[]>;
    findOne(id: number): Promise<ItemInventario>;
}
