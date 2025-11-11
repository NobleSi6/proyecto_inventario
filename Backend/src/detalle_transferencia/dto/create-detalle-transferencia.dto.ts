import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min } from 'class-validator';

export class CreateDetalleTransferenciaDto {
  @IsOptional() @IsInt()
  id_transferencia?: number;

  @IsOptional() @IsInt()
  id_material?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsNotEmpty()
  cantidad: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  cantidad_recibida?: number;

  @IsOptional() @IsString() @MaxLength(5000)
  observaciones?: string;

  @IsOptional() @IsBoolean()
  activo?: boolean = true;
}