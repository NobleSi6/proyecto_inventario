import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CrearMaterialDto {
  
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @IsNotEmpty()
  idCategoria: number;

  @IsNumber()
  @IsNotEmpty()
  idUnidad: number;

  @IsNumber()
  precioUnitario: number;

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
