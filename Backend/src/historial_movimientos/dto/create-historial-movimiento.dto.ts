import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateHistorialMovimientoDto {
  @IsInt()
  id_material: number;

  @IsInt()
  id_almacen: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  tipo_movimiento: string; // entrada | salida | transferencia | ajuste

  @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  cantidad: number;

  @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  stock_anterior?: number;

  @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  stock_nuevo?: number;

  @IsOptional() @IsString() @MaxLength(100)
  referencia?: string;

  @IsInt()
  id_empleado: number;

  @IsOptional() @IsString()
  observaciones?: string;

  @IsOptional() @IsBoolean()
  activo?: boolean = true;
}