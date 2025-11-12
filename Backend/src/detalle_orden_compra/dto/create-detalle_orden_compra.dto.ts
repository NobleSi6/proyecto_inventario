import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDetalleOrdenCompraDto {

  @IsInt()
  @IsPositive()
  @ApiProperty({ description: 'ID de la Orden de Compra a la que pertenece este detalle (FK).', example: 5 })
  readonly id_orden_compra: number;

  @IsInt()
  @IsPositive()
  @ApiProperty({ description: 'ID del material que se está solicitando (FK a la tabla materiales).', example: 8 })
  readonly id_material: number;

  @IsNumber({ maxDecimalPlaces: 3 })
  @IsPositive()
  @ApiProperty({ description: 'Cantidad del material que se desea comprar.', example: 50.0, minimum: 0.001 })
  readonly cantidad: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @ApiProperty({ description: 'Precio unitario acordado en la orden de compra.', example: 12.50, minimum: 0.01 })
  readonly precio_unitario: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @ApiProperty({ description: 'Subtotal calculado para este ítem (cantidad * precio_unitario).', example: 625.00 })
  readonly subtotal: number; // Nota: Este campo es usualmente calculado en el servidor

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({ description: 'Observaciones específicas sobre el material solicitado en esta orden.', example: 'Requerido para el Lote 3B del proyecto A.', required: false })
  readonly observaciones?: string;

  @IsBoolean()
  @IsOptional() // Hacemos esto opcional en la entrada, pero aseguramos el tipo booleano
  @ApiProperty({ description: 'Estado activo/inactivo del registro de detalle.', example: true, default: true })
  readonly activo: boolean = true;
}