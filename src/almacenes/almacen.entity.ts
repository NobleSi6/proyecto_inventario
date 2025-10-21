import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

const decimalTransformer = {
  to: (value?: number | null) => value,
  from: (value: string | null): number | null => (value === null ? null : Number(value)),
};

@Entity({ name: 'almacenes' })
export class Almacen {
  @PrimaryGeneratedColumn({ name: 'id_almacen' })
  id_almacen: number;

  @Column({ name: 'nombre', type: 'varchar', length: 150 })
  nombre: string;

  @Index({ unique: true })
  @Column({ name: 'codigo', type: 'varchar', length: 50, nullable: true })
  codigo?: string | null;

  @Column({ name: 'direccion', type: 'text', nullable: true })
  direccion?: string | null;

  @Column({ name: 'ciudad', type: 'varchar', length: 100, nullable: true })
  ciudad?: string | null;

  @Column({ name: 'telefono', type: 'varchar', length: 20, nullable: true })
  telefono?: string | null;

  @Column({
    name: 'capacidad_m3',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: decimalTransformer,
  })
  capacidad_m3?: number | null;

  @Column({ name: 'activo', type: 'boolean', nullable: true, default: true })
  activo?: boolean | null;

  @Column({ name: 'fecha_creacion', type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion?: Date | null;

  @Column({ name: 'responsable', type: 'int' })
  responsable: number;
}