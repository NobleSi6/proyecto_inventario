// src/warehousing-core/dto/process-movement.dto.ts
import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
export class ProcessMovementDto {
  @IsInt() id_material: number;
  @IsInt() id_almacen: number;
  @IsNumber({ maxDecimalPlaces: 2 }) @IsPositive() cantidad: number;
  @IsString() @IsNotEmpty() referencia: string;
  @IsInt() id_empleado: number;
}