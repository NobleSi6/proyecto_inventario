import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
// Importa la entidad Employee si está en un path conocido
import { Employee } from '../employee/entities/employee.entity'; 


@Entity('roles')
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true, nullable: true })
  cargo: string;

  // Relación: Un rol tiene muchos usuarios (Asumimos que Usuario.rol existe)
  @OneToMany(() => Usuario, (usuario) => usuario.rol)
  usuarios: Usuario[];

  // ✅ Nueva Relación: Un rol tiene muchos empleados
  @OneToMany(() => Employee, (employee) => employee.rol)
  empleados: Employee[]; 
}