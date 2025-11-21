import { Usuario } from 'src/usuarios/usuarios.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity({ name: 'roles' })
export class Rol {
  @PrimaryGeneratedColumn()
  id_cargo: number;

  @Column({ type: 'varchar', length: 100 })
  tipo_cargo: string;

  @CreateDateColumn()
  fecha_creacion: Date;

  @Column({ default: true })
  activo: boolean;
  
  @OneToMany(() => Usuario, usuario => usuario.rol)
  usuarios: Usuario[];
}
