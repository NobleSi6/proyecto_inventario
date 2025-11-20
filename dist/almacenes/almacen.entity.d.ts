export declare class Almacen {
    id_almacen: number;
    nombre: string;
    codigo?: string | null;
    direccion?: string | null;
    ciudad?: string | null;
    telefono?: string | null;
    capacidad_m3?: number | null;
    activo?: boolean | null;
    fecha_creacion?: Date | null;
    responsable: number;
}
