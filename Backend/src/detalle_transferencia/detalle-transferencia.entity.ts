import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

const decimalTransformer = {
  to: (value?: number | null) => value,
  from: (value: string | null): number | null => (value === null ? null : Number(value)),
};

@Entity({ name: 'detalle_transferencia' })
export class DetalleTransferencia {
  @PrimaryGeneratedColumn({ name: 'id_detalle_transferencia' })
  id_detalle_transferencia: number;

  @Index()
  @Column({ name: 'id_transferencia', type: 'int'})
  id_transferencia: number;

  @Index()
  @Column({ name: 'id_material', type: 'int'})
  id_material: number;

  @Column({
    name: 'cantidad',
    type: 'numeric',
    precision: 12,
    scale: 2,
    transformer: decimalTransformer,
  })
  cantidad: number;

  @Column({
    name: 'cantidad_recibida',
    type: 'numeric',
    precision: 12,
    scale: 2,
    nullable: true,
    transformer: decimalTransformer,
  })
  cantidad_recibida?: number | null;

  @Column({ name: 'observaciones', type: 'text', nullable: true })
  observaciones?: string | null;

  @Column({ name: 'activo', type: 'boolean', default: true })
  activo: boolean;
}