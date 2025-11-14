import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity({ name: 'salidas_inventario' })
export class Salida {
  @PrimaryGeneratedColumn({ name: 'id_salida' })
  id_salida: number;

  @Index({ unique: true })
  @Column({ name: 'numero_salida', type: 'varchar', length: 50 })
  numero_salida: string;

  @Column({ name: 'id_almacen', type: 'int', nullable: true })
  id_almacen?: number | null;

  @Column({ name: 'id_proyecto', type: 'int', nullable: true })
  id_proyecto?: number | null;

  @Column({ name: 'id_empleado_autoriza', type: 'int', nullable: true })
  id_empleado_autoriza?: number | null;

  @Column({ name: 'id_empleado_retira', type: 'int', nullable: true })
  id_empleado_retira?: number | null;

  @Column({ name: 'fecha_salida', type: 'date', default: () => 'CURRENT_DATE' })
  fecha_salida: string;

  @Column({ name: 'tipo_salida', type: 'varchar', length: 50, default: 'uso en proyecto', nullable: true })
  tipo_salida?: string | null;

  @Column({ name: 'observaciones', type: 'text', nullable: true })
  observaciones?: string | null;

  @Column({ name: 'fecha_creacion', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ name: 'activo', type: 'boolean', default: true })
  activo: boolean;
}