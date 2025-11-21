import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Rol } from '../roles/roles.entity';
import { Usuario } from '../usuarios/usuarios.entity';

@Entity({ name: 'empleados' })
export class Empleado {
  @PrimaryGeneratedColumn()
  id_empleado: number;

  @Column()
  codigo: string;

  @Column()
  nombres: string;

  @Column()
  ap_paterno: string;

  @Column()
  ap_materno: string;

  @Column()
  ci: string;

  @Column()
  id_cargo: number;

  @ManyToOne(() => Rol)
  @JoinColumn({ name: 'id_cargo' })
  rol?: Rol;

  @Column()
  telefono: string;

  @Column()
  email: string;

  @Column()
  fecha_contratacion: Date;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  fecha_registro: Date;

  @Column({ nullable: true })
  id_usuario: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario?: Usuario;
}
