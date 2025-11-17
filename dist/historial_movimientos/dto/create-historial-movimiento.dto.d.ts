export declare class CreateHistorialMovimientoDto {
    id_material: number;
    id_almacen: number;
    tipo_movimiento: string;
    cantidad: number;
    stock_anterior?: number;
    stock_nuevo?: number;
    referencia?: string;
    id_empleado: number;
    observaciones?: string;
    activo?: boolean;
}
