import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('proveedores')
export class Proveedor {
  @PrimaryGeneratedColumn()
  id_proveedor: number; // PK actualizada

  @Column({ length: 200, nullable: false })
  nombre_empresa: string; // Nombre actualizado

  @Column({ length: 20, nullable: true, unique: true })
  nit: string; // Ahora es nullable, pero único

  @Column({ length: 20, nullable: true })
  telefono: string; // Nombre actualizado

  @Column({ length: 100, nullable: true })
  email: string; 

  @Column({ type: 'text', nullable: true })
  direccion: string; 

  @Column({ length: 100, nullable: true })
  ciudad: string; // Nuevo campo

  @Column({ length: 100, default: 'bolivia', nullable: true })
  pais: string; // Nuevo campo

  @Column({ length: 150, nullable: true })
  contacto_nombre: string; // Nuevo campo

  @Column({ length: 20, nullable: true })
  contacto_telefono: string; // Nuevo campo

  @Column({ default: true, nullable: true })
  activo: boolean; // Estado actualizado

  @CreateDateColumn({ type: 'timestamp' })
  fecha_registro: Date; // Nuevo campo (se maneja por defecto en DB)
}