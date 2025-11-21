import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean; // por defecto será true en la BD
}
