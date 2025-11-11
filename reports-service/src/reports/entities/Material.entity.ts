import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

const moneyTransformer = {
  to: (value?: number | null) => value,
  from: (value: string | null): number | null => (value === null ? null : Number(value)),
};

@Entity({ name: 'materiales' })
export class Material {
  @PrimaryGeneratedColumn({ name: 'id_material' })
  id_material: number;

  @Index({ unique: true })
  @Column({ name: 'codigo', type: 'varchar', length: 50 })
  codigo: string;

  @Column({ name: 'nombre', type: 'varchar', length: 200 })
  nombre: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion?: string | null;

  @Index()
  @Column({ name: 'id_categoria', type: 'int'})
  id_categoria: number;

  @Index()
  @Column({ name: 'id_unidad', type: 'int'})
  id_unidad: number;

  @Column({
    name: 'precio_unitario',
    type: 'numeric',
    precision: 12,
    scale: 2,
    nullable: true,
    transformer: moneyTransformer,
  })
  precio_unitario?: number | null;

  @Column({ name: 'stock_minimo', type: 'int', default: 0, nullable: true })
  stock_minimo?: number | null;

  @Column({ name: 'stock_maximo', type: 'int', nullable: true })
  stock_maximo?: number | null;

  @Column({ name: 'ubicacion_almacen', type: 'varchar', length: 100, nullable: true })
  ubicacion_almacen?: string | null;

  @Column({ name: 'activo', type: 'boolean', default: true, nullable: true })
  activo?: boolean | null;

  @Column({ name: 'fecha_creacion', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
  fecha_creacion?: Date | null;
}