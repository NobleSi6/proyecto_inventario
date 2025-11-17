import { RolesService } from './roles.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './rol.entity';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRolDto: CreateRolDto): Promise<Rol>;
    findAll(): Promise<Rol[]>;
    findOne(id: string): Promise<Rol>;
    update(id: string, updateRolDto: UpdateRolDto): Promise<Rol>;
    remove(id: string): Promise<void>;
}
