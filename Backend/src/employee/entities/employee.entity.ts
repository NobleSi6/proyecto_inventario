// src/employee/entities/employee.entity.ts

import { Rol } from 'src/roles/rol.entity';
import { Usuario } from 'src/usuarios/usuario.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

// Suponiendo que tienes estas entidades (o sus nombres de clase) definidas
// import { Usuario } from '../../usuarios/entities/usuario.entity';
// import { Rol } from '../../rol/entities/rol.entity';

/**
 * Entidad que representa la tabla 'empleados' en la base de datos.
 * Las propiedades internas usan camelCase, las columnas de DB usan snake_case
 * (mediante el decorador @Column).
 */
@Entity('empleados')
export class Employee { // Cambié el nombre de la clase de Employee a Empleado para reflejar mejor el esquema
  
  // ----------------------------------------------------
  // CLAVES PRIMARIAS Y CAMPOS PRINCIPALES DE EMPLEADO
  // ----------------------------------------------------
  
  // Clave Primaria - id_empleado (serial, PK)
  @PrimaryGeneratedColumn({ name: 'id_empleado' })
  idEmpleado: number;

  // Código del empleado (varchar(50), NOT NULL)
  @Column({ name: 'codigo', type: 'varchar', length: 50, nullable: false })
  codigo: string;

  // Nombres (varchar(100), NOT NULL)
  @Column({ name: 'nombres', type: 'varchar', length: 100, nullable: false })
  nombres: string;

  // Apellido Paterno (varchar(100), NOT NULL)
  @Column({ name: 'ap_paterno', type: 'varchar', length: 100, nullable: false })
  apPaterno: string; 

  // Apellido Materno (varchar(100), NOT NULL)
  @Column({ name: 'ap_materno', type: 'varchar', length: 100, nullable: false })
  apMaterno: string; 

  // Cédula de Identidad (varchar(20), NOT NULL)
  @Column({ name: 'ci', type: 'varchar', length: 20, nullable: false })
  ci: string;

  // Teléfono (varchar(20), NOT NULL)
  @Column({ name: 'telefono', type: 'varchar', length: 20, nullable: false })
  telefono: string;

  // Correo electrónico (varchar(100), NOT NULL) - Asumimos UNIQUE en DB
  @Column({ name: 'email', type: 'varchar', length: 100, nullable: false, unique: true })
  email: string;

  // Fecha de Contratación (date, NOT NULL)
  @Column({ name: 'fecha_contratacion', type: 'date', nullable: true })
  fechaContratacion: Date;
  
  // Activo (boolean, NOT NULL)
  @Column({ name: 'activo', type: 'boolean', default: true, nullable: false })
  activo: boolean;

  // ----------------------------------------------------
  // CLAVES FORÁNEAS Y RELACIONES (FK)
  // ----------------------------------------------------
  
  /* * Opción 1 (Recomendada): Definir las relaciones con las otras entidades.
   * Si usas esta opción, necesitarás importar las clases 'Usuario' y 'Rol'.
   */
  
  // Relación Muchos a Uno con la tabla 'usuarios' (id_usuario, FK)
  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario'})
  usuario: Usuario;
  
  //Relación Muchos a Uno con la tabla 'rol' (id_rol, FK)
  @ManyToOne(() => Rol)
  @JoinColumn({ name: 'id_cargo' })
  rol: Rol;

  /* * Opción 2 (Simple): Solo definir la columna del ID de la relación.
   * Esto evita tener que importar las clases de entidad si solo necesitas el ID.
   */
  @Column({ name: 'id_usuario', type: 'int', nullable: true })
  idUsuario: number;

  @Column({ name: 'id_cargo', type: 'int', nullable: true })
  idRol: number;

  // ----------------------------------------------------
  // METADATOS
  // ----------------------------------------------------

  // Fecha de Registro (timestamp, NOT NULL)
  @CreateDateColumn({ name: 'fecha_registro', type: 'timestamp', nullable: false })
  fechaRegistro: Date;
  
}