import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string; // Nombre del campo actualizado

  @IsString()
  @IsOptional()
  readonly descripcion?: string; 
  
  @IsBoolean()
  @IsOptional()
  readonly activo: boolean = true; // Nuevo campo con default en DB
}