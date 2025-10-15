import { IsIn, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateHistorialDto {
  // ID del ítem de inventario afectado (relación)
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  inventarioId: number; 

  // ID del almacén afectado (relación)
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  almacenId: number; 

  // Tipo de movimiento: ENTRADA, SALIDA, AJUSTE
  @IsString()
  @IsNotEmpty()
  @IsIn(['ENTRADA', 'SALIDA', 'AJUSTE'])
  tipoMovimiento: string; 

  // Cantidad que entra o sale
  @IsNumber()
  @IsNotEmpty()
  @Min(0.01)
  cantidad: number; 

  // Referencia del movimiento (ej. ID de compra, ID de venta, Razón de ajuste)
  @IsString()
  @IsNotEmpty()
  referencia: string; 

  // Comentarios adicionales
  @IsString()
  @IsNotEmpty()
  observaciones: string; 
}