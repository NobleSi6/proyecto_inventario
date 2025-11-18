import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id_categoria: number; // PK actualizada

  @Column({ length: 100, nullable: false, unique: true })
  nombre: string; // Nombre de la columna actualizado

  @Column({ type: 'text', nullable: true })
  descripcion: string; 

  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date; // Nuevo campo

  @Column({ default: true, nullable: false })
  activo: boolean; // Nuevo campo
}