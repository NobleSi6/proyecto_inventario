export declare class Material {
    id_material: number;
    codigo: string;
    nombre: string;
    descripcion?: string | null;
    id_categoria: number;
    id_unidad: number;
    precio_unitario?: number | null;
    stock_minimo?: number | null;
    stock_maximo?: number | null;
    ubicacion_almacen?: string | null;
    activo?: boolean | null;
    fecha_creacion?: Date | null;
}
