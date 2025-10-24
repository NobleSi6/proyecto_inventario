export class CreateEntradaInventarioDto {
  numero_entrada: string;
  id_almacen: number;
  id_orden_compra: number;
  id_empleado_recibe: number;
  fecha_entrada?: Date;
  tipo_entrada?: string;
  observaciones?: string;
  activo: boolean;
}
