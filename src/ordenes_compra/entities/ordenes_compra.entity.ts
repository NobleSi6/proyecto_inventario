import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ordenes_compra')
export class OrdenCompra {
  @PrimaryGeneratedColumn()
  id_orden_compra: number;

  @Column()
  numero_orden: string;

  @Column({ nullable: true })
  id_proveedor: number;

  @Column({ nullable: true })
  id_proyecto: number;

  @Column({ nullable: true })
  id_empleado_solicita: number;

  @Column({ type: 'date' })
  fecha_orden: Date;

  @Column({ type: 'date', nullable: true })
  fecha_entrega_estimada: Date;

  @Column({ type: 'date', nullable: true })
  fecha_entrega_real: Date;

  @Column({ type: 'numeric', nullable: true })
  subtotal: number;

  @Column({ type: 'numeric', nullable: true })
  impuestos: number;

  @Column({ type: 'numeric', nullable: true })
  total: number;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column({ type: 'timestamp', nullable: true })
  fecha_creacion: Date;

  @Column()
  estado: number;

  @Column()
  activo: boolean;
}
