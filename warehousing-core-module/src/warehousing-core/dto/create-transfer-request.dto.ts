// src/warehousing-core/dto/create-transfer-request.dto.ts

import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsOptional,
  Length,
  IsDateString,
} from 'class-validator';

/**
 * DTO para cada ítem dentro de la solicitud de transferencia (Detalle de Transferencia)
 */
export class TransferItemDto {
  @IsInt()
  @IsNotEmpty()
  id_material: number; // Material a transferir

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsNotEmpty()
  cantidad: number; // Cantidad solicitada

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  observaciones?: string; // Observaciones del ítem
}

/**
 * DTO principal para la creación de una nueva Transferencia (Encabezado + Detalles)
 */
export class CreateTransferRequestDto {
  // ----------------------------------------------------
  // Campos para la tabla 'transferencias' (Encabezado)
  // ----------------------------------------------------

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  numero_transferencia: string;

  @IsInt()
  @IsNotEmpty()
  id_almacen_origen: number; // Almacén desde donde sale el material

  @IsInt()
  @IsNotEmpty()
  id_almacen_destino: number; // Almacén al que llega el material

  @IsInt()
  @IsNotEmpty()
  id_empleado_solicitante: number; // Empleado que crea la solicitud

  // En el servicio core le asignaremos el 'id_empleado_autoriza' si la autoriza al crearla.
  // Pero aquí la recibimos como campo opcional o ya autorizado.
  @IsOptional()
  @IsInt()
  id_empleado_autoriza?: number; 
  
  @IsOptional()
  @IsDateString()
  fecha_transferencia?: string; // Fecha de la solicitud/transferencia

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  observaciones?: string; // Observaciones generales de la transferencia

  // ----------------------------------------------------
  // Campos para la tabla 'detalle_transferencia' (Detalles)
  // ----------------------------------------------------

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TransferItemDto)
  items: TransferItemDto[];
}