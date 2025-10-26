// src/roles/dto/create-rol.dto.ts

import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateRolDto {
  @IsString({ message: 'El cargo debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El cargo no puede estar vacío.' })
  @MaxLength(50, { message: 'El cargo no puede exceder los 50 caracteres.' })
  cargo: string;
}