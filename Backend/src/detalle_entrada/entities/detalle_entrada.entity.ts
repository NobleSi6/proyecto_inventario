import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('detalle_entrada')
export class DetalleEntrada {
  @PrimaryGeneratedColumn()
  id_detalle_entrada: number;

  @Column()
  id_entrada: number;

  @Column()
  id_material: number;

  @Column({ type: 'numeric' })
  cantidad: number;

  @Column({ type: 'numeric', nullable: true })
  precio_unitario: number;

  @Column({ nullable: true })
  lote: string;

  @Column({ type: 'date', nullable: true })
  fecha_vencimiento: Date;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column()
  activo: boolean;
}
