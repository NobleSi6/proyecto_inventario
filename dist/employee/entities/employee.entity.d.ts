import { Rol } from 'src/roles/rol.entity';
import { Usuario } from 'src/usuarios/usuario.entity';
export declare class Employee {
    idEmpleado: number;
    codigo: string;
    nombres: string;
    apPaterno: string;
    apMaterno: string;
    ci: string;
    telefono: string;
    email: string;
    fechaContratacion: Date;
    activo: boolean;
    usuario: Usuario;
    rol: Rol;
    idUsuario: number;
    idRol: number;
    fechaRegistro: Date;
}
