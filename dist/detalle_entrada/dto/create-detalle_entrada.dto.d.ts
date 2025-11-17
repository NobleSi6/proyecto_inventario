export declare class CreateDetalleEntradaDto {
    id_entrada: number;
    id_material: number;
    cantidad: number;
    precio_unitario?: number;
    lote?: string;
    fecha_vencimiento?: Date;
    observaciones?: string;
    activo: boolean;
}
