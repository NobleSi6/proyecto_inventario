export declare class CreateTransferenciaDto {
    numero_transferencia: string;
    id_almacen_origen: number;
    id_almacen_destino: number;
    id_empleado_autoriza: number;
    fecha_transferencia: string;
    fecha_recepcion: string;
    observaciones?: string;
    estado: number;
    id_empleado_solicitante: number;
    activo?: boolean;
}
