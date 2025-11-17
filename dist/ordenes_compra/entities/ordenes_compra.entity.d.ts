export declare class OrdenCompra {
    id_orden_compra: number;
    numero_orden: string;
    id_proveedor: number;
    id_proyecto: number;
    id_empleado_solicita: number;
    fecha_orden: Date;
    fecha_entrega_estimada: Date;
    fecha_entrega_real: Date;
    subtotal: number;
    impuestos: number;
    total: number;
    observaciones: string;
    fecha_creacion: Date;
    estado: number;
    activo: boolean;
}
