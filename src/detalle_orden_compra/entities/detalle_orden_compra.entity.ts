import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('detalle_orden_compra')
export class DetalleOrdenCompra {
  @PrimaryGeneratedColumn()
  id_detalle: number;

  @Column()
  id_orden_compra: number;

  @Column()
  id_material: number;

  @Column({ type: 'numeric' })
  cantidad: number;

  @Column({ type: 'numeric' })
  precio_unitario: number;

  @Column({ type: 'numeric' })
  subtotal: number;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column()
  activo: boolean;
}
