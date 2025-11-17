export declare class CreateMaterialDto {
    codigo: string;
    nombre: string;
    descripcion?: string;
    id_categoria?: number;
    id_unidad?: number;
    precio_unitario?: number;
    stock_minimo?: number;
    stock_maximo?: number;
    ubicacion_almacen?: string;
    activo?: boolean;
}
