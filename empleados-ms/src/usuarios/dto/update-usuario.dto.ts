import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsOptional, IsString, IsBoolean, IsNumber, Min } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @IsOptional()
  @IsString({ message: 'El nombre de usuario debe ser un texto válido' })
  username?: string;

  @IsOptional()
  @IsString({ message: 'La contraseña debe ser un texto válido' })
  password?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El ID del cargo debe ser un número' })
  @Min(1, { message: 'El ID del cargo debe ser un número válido mayor que 0' })
  id_cargo?: number;

  @IsOptional()
  @IsBoolean({ message: 'El estado activo debe ser true o false' })
  activo?: boolean;
}
