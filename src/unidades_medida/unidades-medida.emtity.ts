import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('unidades_medida')
export class UnidadMedida {
  @PrimaryGeneratedColumn()
  id_unidad: number; // PK actualizada

  @Column({ length: 50, nullable: false, unique: true })
  nombre: string;

  @Column({ length: 10, nullable: false, unique: true })
  abreviatura: string;

  @Column({ length: 50, nullable: true })
  tipo: string; // Nuevo campo

  @Column({ default: true, nullable: false })
  activo: boolean; // Nuevo campo
}