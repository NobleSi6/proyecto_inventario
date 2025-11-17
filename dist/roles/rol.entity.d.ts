import { Usuario } from '../usuarios/usuario.entity';
import { Employee } from '../employee/entities/employee.entity';
export declare class Rol {
    id: number;
    cargo: string;
    usuarios: Usuario[];
    empleados: Employee[];
}
