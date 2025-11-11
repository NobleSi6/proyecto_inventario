import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateStockDto {
  @IsInt()
  id_material: number;

  @IsInt()
  id_almacen: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  cantidad_disponible?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  cantidad_reservada?: number;

  @IsOptional() @IsBoolean()
  activo?: boolean = true;
}