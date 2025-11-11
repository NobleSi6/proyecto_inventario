import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length, MaxLength, Min } from 'class-validator';

export class CreateAlmacenDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nombre: string;

  @IsOptional() @IsString()
  @MaxLength(50)
  codigo?: string;

  @IsOptional() @IsString()
  direccion?: string;

  @IsOptional() @IsString() @MaxLength(100)
  ciudad?: string;

  @IsOptional() @IsString() @MaxLength(20)
  telefono?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  capacidad_m3?: number;

  @IsOptional() @IsBoolean()
  activo?: boolean = true;

  @IsInt()
  responsable: number;
}