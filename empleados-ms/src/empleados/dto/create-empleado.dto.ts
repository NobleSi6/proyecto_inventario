import { IsString, IsNotEmpty, IsEmail, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateEmpleadoDto {
  @IsString({ message: 'El código debe ser un texto válido' })
  @IsNotEmpty({ message: 'El código no puede estar vacío' })
  codigo: string;

  @IsString({ message: 'Los nombres deben ser un texto válido' })
  @IsNotEmpty({ message: 'Los nombres no pueden estar vacíos' })
  nombres: string;

  @IsString({ message: 'El apellido paterno debe ser un texto válido' })
  @IsNotEmpty({ message: 'El apellido paterno no puede estar vacío' })
  ap_paterno: string;

  @IsString({ message: 'El apellido materno debe ser un texto válido' })
  @IsNotEmpty({ message: 'El apellido materno no puede estar vacío' })
  ap_materno: string;

  @IsString({ message: 'El CI debe ser un texto válido' })
  @IsNotEmpty({ message: 'El CI no puede estar vacío' })
  ci: string;

  @IsNumber({}, { message: 'El id_cargo debe ser un número válido' })
  id_cargo: number; // importante: coincide con la entity

  @IsString({ message: 'El teléfono debe ser un texto válido' })
  telefono: string;

  @IsEmail({}, { message: 'El email debe ser un correo válido' })
  email: string;

  @IsDateString({}, { message: 'La fecha de contratación debe ser una fecha válida' })
  fecha_contratacion: Date;

  @IsOptional()
  @IsNumber({}, { message: 'El id_usuario debe ser un número si se proporciona' })
  id_usuario?: number;

  @IsOptional()
  activo?: boolean; // opcional para crear empleado con estado activo por defecto
}
