import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('estados')
export class Estado {
  @PrimaryGeneratedColumn()
  id_estado: number;

  // 🚨 CORRECCIÓN 1: Agregamos el campo 'nombre'
  // El largo es 100 y es NOT NULL. Se asume que también debe ser único (unique: true).
  @Column({ length: 100, nullable: false, unique: true }) 
  nombre: string; 

  // 🚨 CORRECCIÓN 2: Agregamos el campo 'descripcion'
  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  // 🚨 CORRECCIÓN 3: Corregimos el nombre del campo a 'tipo' y lo hacemos opcional
  @Column({ type: 'varchar', length: 50, nullable: true })
  tipo: string | null;

  @Column({ default: true, nullable: false })
  activo: boolean;
}