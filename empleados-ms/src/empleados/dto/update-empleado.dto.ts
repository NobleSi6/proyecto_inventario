import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpleadoDto } from './create-empleado.dto';
import { IsOptional, IsString, IsNumber, IsEmail, IsDateString, IsBoolean } from 'class-validator';

export class UpdateEmpleadoDto extends PartialType(CreateEmpleadoDto) {
  @IsOptional()
  @IsString({ message: 'El código debe ser un texto válido' })
  codigo?: string;

  @IsOptional()
  @IsString({ message: 'Los nombres deben ser un texto válido' })
  nombres?: string;

  @IsOptional()
  @IsString({ message: 'El apellido paterno debe ser un texto válido' })
  ap_paterno?: string;

  @IsOptional()
  @IsString({ message: 'El apellido materno debe ser un texto válido' })
  ap_materno?: string;

  @IsOptional()
  @IsString({ message: 'El CI debe ser un texto válido' })
  ci?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El id_cargo debe ser un número válido' })
  id_cargo?: number;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser un texto válido' })
  telefono?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El email debe ser un correo válido' })
  email?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de contratación debe ser una fecha válida' })
  fecha_contratacion?: Date;

  @IsOptional()
  @IsNumber({}, { message: 'El id_usuario debe ser un número si se proporciona' })
  id_usuario?: number;

  @IsOptional()
  @IsBoolean({ message: 'El campo activo debe ser true o false' })
  activo?: boolean;
}
