import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

const decimalTransformer = {
  to: (value?: number | null) => value,
  from: (value: string | null): number | null => (value === null ? null : Number(value)),
};

@Entity({ name: 'historial_movimientos' })
export class HistorialMovimiento {
  @PrimaryGeneratedColumn({ name: 'id_movimiento' })
  id_movimiento: number;

  // FKs NO NULOS (enforced at entity level)
  @Index()
  @Column({ name: 'id_material', type: 'int' })
  id_material: number;

  @Index()
  @Column({ name: 'id_almacen', type: 'int' })
  id_almacen: number;

  @Column({ name: 'tipo_movimiento', type: 'varchar', length: 50 })
  tipo_movimiento: string; // entrada | salida | transferencia | ajuste

  @Column({ name: 'cantidad', type: 'numeric', precision: 12, scale: 2, transformer: decimalTransformer })
  cantidad: number;

  @Column({ name: 'stock_anterior', type: 'numeric', precision: 12, scale: 2, nullable: true, transformer: decimalTransformer })
  stock_anterior?: number | null;

  @Column({ name: 'stock_nuevo', type: 'numeric', precision: 12, scale: 2, nullable: true, transformer: decimalTransformer })
  stock_nuevo?: number | null;

  @Index()
  @Column({ name: 'referencia', type: 'varchar', length: 100, nullable: true })
  referencia?: string | null; // ej: 'SAL-001', 'ENT-010', etc.

  @Index()
  @Column({ name: 'id_empleado', type: 'int' })
  id_empleado: number;

  @Column({ name: 'fecha_movimiento', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_movimiento: Date;

  @Column({ name: 'observaciones', type: 'text', nullable: true })
  observaciones?: string | null;

  @Column({ name: 'activo', type: 'boolean', default: true })
  activo: boolean;
}