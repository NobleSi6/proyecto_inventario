import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length, MaxLength, Min } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  codigo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nombre: string;

  @IsOptional() @IsString()
  descripcion?: string;

  @IsOptional() @IsInt()
  id_categoria?: number;

  @IsOptional() @IsInt()
  id_unidad?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  precio_unitario?: number;

  @IsOptional() @IsInt() @Min(0)
  stock_minimo?: number;

  @IsOptional() @IsInt()
  stock_maximo?: number;

  @IsOptional() @IsString() @MaxLength(100)
  ubicacion_almacen?: string;

  @IsOptional() @IsBoolean()
  activo?: boolean = true;
}