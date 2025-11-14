import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('unidades_medida')
export class UnidadMedida {
  @PrimaryGeneratedColumn()
  // 🚨 CORRECCIÓN 1: Nombre de la PK.
  id_unidad_medida: number; 

  // 🚨 CORRECCIÓN 2: Longitud 100 (y hacemos UNIQUE por buena práctica).
  @Column({ length: 100, nullable: false, unique: true }) 
  nombre: string;

  // 🚨 CORRECCIÓN 3: Nombre 'abreviacion' y longitud 20 (y hacemos UNIQUE por buena práctica).
  @Column({ length: 20, nullable: false, unique: true })
  abreviacion: string;

  // El campo 'tipo' fue eliminado porque no existe en la DB.
  
  @Column({ default: true, nullable: false })
  activo: boolean; 
}