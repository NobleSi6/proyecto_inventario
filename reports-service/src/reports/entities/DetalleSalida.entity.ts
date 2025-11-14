import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { ManyToOne, JoinColumn } from 'typeorm';
import { Material } from './Material.entity';
const decimalTransformer = {
  to: (value?: number | null) => value,
  from: (value: string | null): number | null => (value === null ? null : Number(value)),
};

@Entity({ name: 'detalle_salida' })
export class DetalleSalida {
  @PrimaryGeneratedColumn({ name: 'id_detalle_salida' })
  id_detalle_salida: number;

  @Index()
  @Column({ name: 'id_salida', type: 'int', nullable: true })
  id_salida: number;

  @Index()
  @Column({ name: 'id_material', type: 'int', nullable: true })
  id_material: number;

  @Column({
    name: 'cantidad',
    type: 'numeric',
    precision: 12,
    scale: 2,
    transformer: decimalTransformer,
  })
  cantidad: number;

  @Column({ name: 'observaciones', type: 'text', nullable: true })
  observaciones?: string | null;

  @Column({ name: 'activo', type: 'boolean', default: true })
  activo: boolean;

  @ManyToOne(() => Material)
    @JoinColumn({ name: 'id_material' })
    material: Material;
}