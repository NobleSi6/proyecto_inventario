import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

// DTO corregido (revisión anterior)
export class CreateEstadoDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string; // <-- AHORA REQUERIDO

  @IsString()
  @IsOptional()
  readonly descripcion?: string; 

  @IsString()
  @IsOptional()
  readonly tipo?: string; // <-- AHORA LLAMADO 'tipo'
}