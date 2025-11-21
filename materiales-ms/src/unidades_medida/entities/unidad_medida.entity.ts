import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'unidades_medida' })
export class UnidadMedida {
  @PrimaryGeneratedColumn({ name: 'id_unidad' })
  id_unidad: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 10 })
  abreviatura: string;

  @Column({ type: 'varchar', length: 50 })
  tipo: string; // ejemplo: "longitud", "peso", "volumen"

  @Column({ type: 'boolean', default: true })
  activo: boolean;
}
