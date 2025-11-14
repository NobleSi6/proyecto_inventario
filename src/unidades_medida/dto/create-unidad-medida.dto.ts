import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateUnidadMedidaDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly abreviatura: string;

  @IsString()
  @IsOptional()
  readonly tipo?: string; // Nuevo campo

  @IsBoolean()
  @IsOptional()
  readonly activo: boolean = true; // Nuevo campo con default en DB
}