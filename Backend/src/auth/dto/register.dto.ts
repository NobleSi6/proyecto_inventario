// src/auth/dto/register.dto.ts (AJUSTADO)

import { IsNotEmpty, IsString, MinLength, MaxLength, IsInt } from 'class-validator';

export class RegisterDto {
    
    // ✅ Renombramos el campo de 'email' a 'username' para ser precisos 
    // con la tabla 'usuarios' (que tiene 'username' y no 'email' como columna de acceso).
    // Si usas el email como nombre de usuario, el validador @IsEmail sigue siendo útil.
    @IsString()
    @IsNotEmpty()
    @MaxLength(30) // La columna 'username' es varchar(30) en tu BD
    username: string; 

    @IsString()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    password: string;

    // ✅ FK: id_rol (mapea a la columna 'cargo')
    @IsInt()
    @IsNotEmpty() // Asumimos que el rol es obligatorio
    idRol: number; // El valor por defecto se puede establecer en el servicio o DB

    // ✅ FK REQUERIDA: id_empleado
    @IsInt()
    @IsNotEmpty() // La columna id_empleado es NOT NULL en la tabla usuarios
    idEmpleado: number;

    // Campos como nombre, apellido, email y telefono (del DTO anterior) se remueven 
    // ya que pertenecen a la tabla 'empleados'.
}