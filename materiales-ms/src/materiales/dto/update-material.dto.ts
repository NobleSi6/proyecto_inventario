import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class ActualizarMaterialDto {
  
  @IsString()
  @IsOptional()
  codigo?: string;

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @IsOptional()
  idCategoria?: number;

  @IsNumber()
  @IsOptional()
  idUnidad?: number;

  @IsNumber()
  @IsOptional()
  precioUnitario?: number;

  @IsNumber()
  @IsOptional()
  stockMinimo?: number;

  @IsNumber()
  @IsOptional()
  stockMaximo?: number;

  @IsString()
  @IsOptional()
  ubicacionAlmacen?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
