import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { Rol } from '../roles/rol.entity';

@Entity('usuarios')
export class Usuario{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({length:100})
    nombre:string;
    @Column({length:100,nullable:true})
    apellido:string;
    @Column({length:255, unique:true})
    email:string;
    @Column({ length: 20, nullable: true })
    telefono: string; 
    @Column({name:'password_hash',length:255})
    passwordHash:string;

    @Column({default:true})
    activo:boolean;
    @Column({name:'fecha_creacion', type: 'timestamp', default: ()=>'CURRENT_TIMESTAMP'})
    fechaCreacion: Date;
    
  // ⬇️ RELACIÓN DE ROL (Clave Foránea)
  @ManyToOne(() => Rol, rol => rol.usuarios)
  @JoinColumn({ name: 'id_rol' })
  rol: Rol; // Objeto de Rol

  @Column({ name: 'id_rol' })
  idRol: number; // 👈 ID de la FK

}