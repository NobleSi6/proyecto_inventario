import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('estados')
export class Estado {
  @PrimaryGeneratedColumn()
  id_estado: number;

  @Column({ length: 50, nullable: false, unique: true })
  tipo_estado: string; // Nombre del campo actualizado

  @Column({ default: true, nullable: false })
  activo: boolean; // Nuevo campo
}