import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoriaDto {
  // NOTA: 'nombre' sigue siendo requerido (IsNotEmpty)
  @IsString()
  @IsNotEmpty()
  readonly nombre: string; 

  @IsString()
  @IsOptional()
  readonly descripcion?: string; 

  // Los campos 'fecha_creacion' y 'activo' se manejan por defecto en TypeORM y/o la DB,
  // por lo que se eliminan del DTO de CREACIÓN.
}