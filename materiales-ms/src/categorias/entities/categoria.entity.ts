import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'categorias' })
export class Categoria {
  @PrimaryGeneratedColumn({ name: 'id_categoria' })
  id_categoria: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ name: 'fecha_creacion', type: 'timestamp', default: () => 'NOW()' })
  fecha_creacion: Date;

  @Column({ type: 'boolean', default: true })
  activo: boolean;
}
