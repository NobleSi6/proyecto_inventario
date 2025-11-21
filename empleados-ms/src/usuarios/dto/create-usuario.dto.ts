import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateUsuarioDto {
  @IsString({ message: 'El nombre de usuario debe ser un texto válido' })
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío' })
  username: string;

  @IsString({ message: 'La contraseña debe ser un texto válido' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  password: string;

  @IsNumber({}, { message: 'El ID del cargo debe ser un número' })
  @Min(1, { message: 'El ID del cargo debe ser un número válido mayor que 0' })
  id_cargo: number; // id del rol

  // Opcional: activo por defecto true
  @IsNotEmpty({ message: 'El estado activo debe estar definido' })
  activo?: boolean = true;
}
