import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
    @Column({name:'password_hash',length:255})
    passwordHash:string;
    @Column({length:50, default:'BODEGUERO'})
    rol:string;
    @Column({default:true})
    activo:boolean;
    @Column({name:'fecha_creacion', type: 'timestamp', default: ()=>'CURRENT_TIMESTAMP'})
    fechaCreacion: Date;
}