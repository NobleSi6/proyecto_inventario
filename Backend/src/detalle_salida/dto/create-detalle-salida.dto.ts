import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateDetalleSalidaDto {
  @IsOptional() @IsInt()
  id_salida?: number;

  @IsOptional() @IsInt()
  id_material?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsNotEmpty()
  cantidad: number;

  @IsOptional() @IsString()
  observaciones?: string;

  @IsOptional() @IsBoolean()
  activo?: boolean = true;
}