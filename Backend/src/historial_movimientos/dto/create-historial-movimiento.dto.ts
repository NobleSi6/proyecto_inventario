import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHistorialMovimientoDto {
  
  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID del material involucrado en el movimiento (FK a la tabla materiales).', 
    example: 1 
  })
  readonly id_material: number;

  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID del almacén donde ocurrió el movimiento (FK a la tabla almacenes).', 
    example: 3 
  })
  readonly id_almacen: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({ 
    description: 'Tipo de movimiento registrado.', 
    example: 'entrada',
    enum: ['entrada', 'salida', 'transferencia', 'ajuste'] // Sugerencia de tipos válidos
  })
  readonly tipo_movimiento: string; // entrada | salida | transferencia | ajuste

  @IsNumber({ maxDecimalPlaces: 3 }) // Usamos 3 decimales para consistencia
  @IsPositive()
  @ApiProperty({ 
    description: 'Cantidad de material movido (siempre positiva).', 
    example: 100.00 
  })
  readonly cantidad: number;

  @IsOptional() 
  @IsNumber({ maxDecimalPlaces: 3 }) 
  @Min(0)
  @ApiProperty({ 
    description: 'Stock disponible en el almacén *antes* de este movimiento.', 
    example: 50.00,
    required: false 
  })
  readonly stock_anterior?: number;

  @IsOptional() 
  @IsNumber({ maxDecimalPlaces: 3 }) 
  @Min(0)
  @ApiProperty({ 
    description: 'Stock disponible en el almacén *después* de este movimiento.', 
    example: 150.00,
    required: false 
  })
  readonly stock_nuevo?: number;

  @IsOptional() 
  @IsString() 
  @MaxLength(100)
  @ApiProperty({ 
    description: 'Referencia al documento o ID de la transacción que generó el movimiento (ej: OC-123, TS-005).', 
    example: 'ENT-2025-001',
    required: false 
  })
  readonly referencia?: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID del empleado responsable del registro o quien generó la transacción (FK a la tabla empleados).', 
    example: 4 
  })
  readonly id_empleado: number;

  @IsOptional() 
  @IsString()
  @MaxLength(500)
  @ApiProperty({ 
    description: 'Observaciones adicionales sobre el movimiento.', 
    example: 'Ajuste por inventario físico.',
    required: false 
  })
  readonly observaciones?: string;

  @IsOptional() 
  @IsBoolean()
  @ApiProperty({ 
    description: 'Estado activo del registro de historial (default: true).', 
    example: true, 
    default: true
  })
  readonly activo?: boolean = true;
}