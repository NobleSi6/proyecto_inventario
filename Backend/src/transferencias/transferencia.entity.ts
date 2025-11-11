import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity({ name: 'transferencias' })
export class Transferencia {
  @PrimaryGeneratedColumn({ name: 'id_transferencia' })
  id_transferencia: number;

  @Index({ unique: true })
  @Column({ name: 'numero_transferencia', type: 'varchar', length: 50 })
  numero_transferencia: string;

  @Column({ name: 'id_almacen_origen', type: 'int'})
  id_almacen_origen?: number;

  @Column({ name: 'id_almacen_destino', type: 'int'})
  id_almacen_destino: number;

  @Column({ name: 'id_empleado_autoriza', type: 'int'})
  id_empleado_autoriza: number;

  @Column({ name: 'fecha_transferencia', type: 'date', default: () => 'CURRENT_DATE' })
  fecha_transferencia: string;

  @Column({ name: 'fecha_recepcion', type: 'date', nullable: true })
  fecha_recepcion?: string | null;

  @Column({ name: 'observaciones', type: 'text', nullable: true })
  observaciones?: string | null;

  @Column({ name: 'fecha_creacion', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ name: 'estado', type: 'int' })
  estado: number;

  @Column({ name: 'id_empleado_solicitante', type: 'int' })
  id_empleado_solicitante: number;

  @Column({ name: 'activo', type: 'boolean', default: true })
  activo: boolean;
}