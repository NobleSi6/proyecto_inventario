// src/projects/project.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from 'src/employee/entities/employee.entity';  // ← ajusta la ruta si es necesario
import { Estado } from '../estados/estado.entity';         // ← ajusta la ruta si es necesario

@Entity('proyectos')
export class Project {

  @PrimaryGeneratedColumn({ name: 'id_proyecto' })
  id: number;

  @Column({ length: 50 })
  codigo: string;

  @Column({ length: 200 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ type: 'text', nullable: true })
  direccion?: string;

  @Column({ length: 100, nullable: true })
  ciudad?: string;

  @Column({ type: 'date', nullable: true })
  fecha_inicio?: Date;

  @Column({ type: 'date', nullable: true })
  fecha_fin_estimada?: Date;

  @Column({ type: 'date', nullable: true })
  fecha_fin_real?: Date;

  @Column({ type: 'numeric', precision: 15, scale: 2, nullable: true })
  presupuesto?: number;

  @Column({ type: 'boolean', default: true })
  activo?: boolean;

  // CORREGIDO: la columna REAL se llama "responsable"
  @Column({ name: 'responsable' })
  responsable: number;   // ← este es el ID del empleado

  // Si quieres cargar el objeto Empleado completo (recomendado)
  @ManyToOne(() => Employee, { nullable: false })
  @JoinColumn({ name: 'responsable' })   // ← importantísimo
  empleadoResponsable?: Employee;

  // Lo mismo para el estado
  @Column({ name: 'estado' })
  estado: number;

  @ManyToOne(() => Estado)
  @JoinColumn({ name: 'estado' })
  estadoProyecto?: Estado;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion' })
  fecha_creacion: Date;
}