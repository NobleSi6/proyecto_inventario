// configuracion-service/src/estados/entities/estado.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('estados')
export class Estado {
  @PrimaryGeneratedColumn()
  id_estado: number;

  @Column({ length: 50 })
  tipo_estado: string;

  @Column()
  activo: boolean;
}