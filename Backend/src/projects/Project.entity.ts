// src/projects/project.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('proyectos') // Asegúrate de usar el nombre exacto de la tabla: 'proyectos'
export class Project {

  // 1. Clave Primaria (id_proyecto)
  @PrimaryGeneratedColumn({ name: 'id_proyecto' })
  id: number; // Mapeado a id_proyecto

  // 2. Campos NO NULOS
  @Column({ length: 50 })
  codigo: string; // varchar(50)

  @Column({ length: 200 })
  nombre: string; // varchar(200)

  // 3. Campos NULABLES (Nullable: true)
  @Column({ type: 'text', nullable: true })
  descripcion: string; // text

  @Column({ type: 'text', nullable: true })
  direccion: string; // text

  @Column({ length: 100, nullable: true })
  ciudad: string; // varchar(100)

  @Column({ type: 'date', nullable: true })
  fecha_inicio: Date; // date

  @Column({ type: 'date', nullable: true })
  fecha_fin_estimada: Date; // date

  @Column({ type: 'date', nullable: true })
  fecha_fin_real: Date; // date

  @Column({ type: 'numeric', precision: 15, scale: 2, nullable: true })
  presupuesto: number; // numeric(15, 2)

  @Column({ type: 'boolean', nullable: true, default: true })
  activo: boolean; // boolean (usamos default: true por convención, aunque en la DB es N)

  // 4. Claves Foráneas (FK)
  // Usamos 'int' y 'nullable: true' para coincidir con la definición de la tabla.
  // Podrías usar @ManyToOne si ya tuvieras la entidad de 'Responsable' y 'Estado'.
  @Column({ type: 'int', nullable: true })
  id_empleado: number; // int (FK)

  @Column({ type: 'int', nullable: true })
  id_estado: number; // int (FK)

  // 5. Fecha de Creación (TIMESTAMP)
  // Usamos @CreateDateColumn para manejar el valor DEFAULT CURRENT_TIMESTAMP de PostgreSQL.
  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion' })
  fecha_creacion: Date;
}