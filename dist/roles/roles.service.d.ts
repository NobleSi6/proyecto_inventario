import { Repository } from 'typeorm';
import { Rol } from './rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
export declare class RolesService {
    private rolesRepository;
    constructor(rolesRepository: Repository<Rol>);
    create(createRolDto: CreateRolDto): Promise<Rol>;
    findAll(): Promise<Rol[]>;
    findOne(id: number): Promise<Rol>;
    update(id: number, updateRolDto: UpdateRolDto): Promise<Rol>;
    remove(id: number): Promise<void>;
}
