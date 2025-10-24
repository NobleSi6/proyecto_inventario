export class CreateOrdenCompraDto {
  numero_orden: string;
  id_proveedor?: number;
  id_proyecto?: number;
  id_empleado_solicita?: number;
  fecha_orden?: Date;
  fecha_entrega_estimada?: Date;
  fecha_entrega_real?: Date;
  subtotal?: number;
  impuestos?: number;
  total?: number;
  observaciones?: string;
  estado: number;
  activo: boolean;
}

