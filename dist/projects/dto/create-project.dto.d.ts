export declare class CreateProjectDto {
    codigo: string;
    nombre: string;
    descripcion?: string;
    direccion?: string;
    ciudad?: string;
    fecha_inicio?: Date;
    fecha_fin_estimada?: Date;
    fecha_fin_real?: Date;
    presupuesto?: number;
    activo?: boolean;
    responsable?: number;
    estado?: number;
}
