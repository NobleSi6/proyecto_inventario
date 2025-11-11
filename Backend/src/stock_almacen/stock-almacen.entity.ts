import { Entity, PrimaryGeneratedColumn, Column, Index, Unique } from 'typeorm';

const decimalTransformer = {
  to: (value?: number | null) => value,
  from: (value: string | null): number | null => (value === null ? null : Number(value)),
};

@Entity({ name: 'stock_almacen' })
@Unique('AK_6', ['id_material', 'id_almacen'])
export class StockAlmacen {
  @PrimaryGeneratedColumn({ name: 'id_stock' })
  id_stock: number;

  @Index()
  @Column({ name: 'id_material', type: 'int'})
  id_material: number;

  @Index()
  @Column({ name: 'id_almacen', type: 'int'})
  id_almacen: number;

  @Column({
    name: 'cantidad_disponible',
    type: 'numeric',
    precision: 12,
    scale: 2,
    nullable: true,
    default: () => '0',
    transformer: decimalTransformer,
  })
  cantidad_disponible?: number | null;

  @Column({
    name: 'cantidad_reservada',
    type: 'numeric',
    precision: 12,
    scale: 2,
    nullable: true,
    default: () => '0',
    transformer: decimalTransformer,
  })
  cantidad_reservada?: number | null;

  @Column({
    name: 'ultima_actualizacion',
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  ultima_actualizacion?: Date | null;

  @Column({ name: 'activo', type: 'boolean', default: true })
  activo: boolean;
}