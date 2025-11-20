export declare class HistorialMovimiento {
    id_movimiento: number;
    id_material: number;
    id_almacen: number;
    tipo_movimiento: string;
    cantidad: number;
    stock_anterior?: number | null;
    stock_nuevo?: number | null;
    referencia?: string | null;
    id_empleado: number;
    fecha_movimiento: Date;
    observaciones?: string | null;
    activo: boolean;
}
