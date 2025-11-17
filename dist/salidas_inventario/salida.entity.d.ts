export declare class Salida {
    id_salida: number;
    numero_salida: string;
    id_almacen?: number | null;
    id_proyecto?: number | null;
    id_empleado_autoriza?: number | null;
    id_empleado_retira?: number | null;
    fecha_salida: string;
    tipo_salida?: string | null;
    observaciones?: string | null;
    fecha_creacion: Date;
    activo: boolean;
}
