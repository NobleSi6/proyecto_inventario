import { IsString, IsNotEmpty, MaxLength, IsBoolean, IsOptional } from 'class-validator';

export class CreateRolDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  tipo_cargo: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean; // opcional porque por defecto es true
}
