import { Rol } from '../roles/rol.entity';
export declare class Usuario {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    passwordHash: string;
    activo: boolean;
    fechaCreacion: Date;
    rol: Rol;
    idRol: number;
}
