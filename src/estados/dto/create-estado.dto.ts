import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateEstadoDto {
  @IsString()
  @IsNotEmpty()
  readonly tipo_estado: string; // Nombre del campo actualizado

  @IsBoolean()
  @IsOptional()
  readonly activo: boolean = true; // Nuevo campo
}