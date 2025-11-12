import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    JoinColumn, 
    OneToOne 
} from "typeorm";
import { Rol } from '../roles/rol.entity';
// Importa Empleado (Employee) para la relación de clave foránea
import { Employee } from '../employee/entities/employee.entity'; 

@Entity('usuarios')
export class Usuario{
    
    // 1. CLAVE PRIMARIA (id_usuario): Resuelve el error 'Usuario.id'
    @PrimaryGeneratedColumn({name: "id_usuario"}) // DB: id_usuario serial NOT NULL
    id: number; 
    
    // 2. CAMPO PRINCIPAL (username): El esquema no tiene nombre/apellido/email
    @Column({name: 'username', length: 30, nullable: false}) // DB: username varchar(30) NOT NULL
    username: string; 

    // 3. PASSWORD (password): La columna se llama 'password', no 'password_hash'
    @Column({name: 'password', length: 200, nullable: false}) // DB: password varchar(200) NOT NULL
    password: string;

    // Los campos 'nombre', 'apellido', 'email', 'telefono' han sido removidos 
    // porque no existen en la tabla 'usuarios'.

    @Column({nullable: false}) // DB: activo boolean NOT NULL
    activo: boolean;
    
    // 4. FECHA DE CREACIÓN: El tipo en la DB es 'date', no 'timestamp'
    @Column({name:'fecha_creacion', type: 'date', nullable: false, default: ()=>'CURRENT_DATE'}) // DB: fecha_creacion date NOT NULL
    fechaCreacion: Date;
    
    // ---------------------------------------------------------------------
    // CLAVES FORÁNEAS (FK)
    // ---------------------------------------------------------------------

  @Column({ name: 'id_rol' , nullable: true})
  idRol: number; // 👈 ID de la FK

  // COMENTADO POR QUE ESTE NO ES EL QUE HIZO ELIAS, ESTE ES OTRO
    // @Column({ name: 'cargo', nullable: false }) // DB: cargo int NOT NULL
    // idRol: number; // ID de la FK

    
    // 6. RELACIÓN EMPLEADO: Faltaba esta FK, es requerida por la DB
    @OneToOne(() => Employee) // Generalmente es OneToOne o ManyToOne dependiendo de la lógica
    @JoinColumn({ name: 'id_empleado' }) // DB: id_empleado
    empleado: Employee;

    @Column({ name: 'id_empleado', nullable: false }) // DB: id_empleado int NOT NULL
    idEmpleado: number;
}