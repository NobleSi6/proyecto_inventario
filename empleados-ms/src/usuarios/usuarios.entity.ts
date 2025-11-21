import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  ManyToOne, 
  JoinColumn 
} from 'typeorm';
import { Rol } from '../roles/roles.entity';

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @ManyToOne(() => Rol, rol => rol.usuarios)
  @JoinColumn({ name: 'id_cargo' })
  rol: Rol;
}
