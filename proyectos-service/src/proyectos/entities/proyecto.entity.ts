// proyectos-service/src/proyectos/entities/proyecto.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('proyectos')
export class Proyecto {
  @PrimaryGeneratedColumn()
  id_proyecto: number;

  @Column({ length: 50, unique: true })
  codigo: string;

  @Column({ length: 200 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'text', nullable: true })
  direccion: string;

  @Column({ length: 100, nullable: true })
  ciudad: string;

  @Column({ type: 'date', nullable: true })
  fecha_inicio: Date;

  @Column({ type: 'date', nullable: true })
  fecha_fin_estimada: Date;

  @Column({ type: 'date', nullable: true })
  fecha_fin_real: Date;

  @Column({ type: 'numeric', precision: 15, scale: 2, nullable: true })
  presupuesto: number;

  @Column({ default: true })
  activo: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column()
  responsable: number; // ID del empleado

  @Column()
  estado: number; // ID del estado
}