import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('proveedores')
export class Proveedor {
  @PrimaryGeneratedColumn()
  id_proveedor: number;

  @Column({ length: 150, nullable: false }) 
  nombre: string; 

  // 🚨 CORRECCIÓN 1: Se añade type: 'varchar'
  @Column({ type: 'varchar', length: 100, nullable: true })
  contacto: string | null;

  // 🚨 CORRECCIÓN 2: Se añade type: 'varchar' (para prevenir el mismo error)
  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string | null; 

  // 🚨 CORRECCIÓN 3: Se añade type: 'varchar' (para prevenir el mismo error)
  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string | null; 

  // type: 'text' ya es explícito
  @Column({ type: 'text', nullable: true })
  direccion: string | null; 

  @Column({ length: 20, nullable: false, unique: true }) 
  nit: string; 

  @Column({ default: true, nullable: false })
  activo: boolean; 
}