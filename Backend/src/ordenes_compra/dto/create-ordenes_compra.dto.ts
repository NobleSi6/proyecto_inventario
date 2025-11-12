import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrdenCompraDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({ 
    description: 'Número de identificación único de la orden de compra.', 
    example: 'OC-2025-00100' 
  })
  readonly numero_orden: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID del proveedor al que se realiza la compra (FK).', 
    example: 4, 
    required: false 
  })
  readonly id_proveedor?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID del proyecto para el cual se solicita el material (FK).', 
    example: 2, 
    required: false 
  })
  readonly id_proyecto?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID del empleado que solicita la orden de compra (FK).', 
    example: 18, 
    required: false 
  })
  readonly id_empleado_solicita?: number;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ 
    description: 'Fecha en la que se genera la orden de compra. Si se omite, se usa la fecha actual.', 
    example: '2025-10-20T10:00:00Z', 
    required: false,
    type: String
  })
  readonly fecha_orden?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ 
    description: 'Fecha estimada de entrega por parte del proveedor.', 
    example: '2025-11-05', 
    required: false,
    type: String
  })
  readonly fecha_entrega_estimada?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ 
    description: 'Fecha real de la recepción total o parcial de la orden.', 
    example: '2025-11-04', 
    required: false,
    type: String
  })
  readonly fecha_entrega_real?: Date;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }) 
  @Min(0)
  @ApiProperty({ 
    description: 'Suma de los subtotales de todos los ítems de la orden (sin impuestos).', 
    example: 12500.50, 
    minimum: 0,
    required: false 
  })
  readonly subtotal?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }) 
  @Min(0)
  @ApiProperty({ 
    description: 'Monto total de los impuestos aplicados a la orden.', 
    example: 1500.00, 
    minimum: 0,
    required: false 
  })
  readonly impuestos?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }) 
  @Min(0)
  @ApiProperty({ 
    description: 'Total final de la orden (subtotal + impuestos).', 
    example: 14000.50, 
    minimum: 0,
    required: false 
  })
  readonly total?: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  @ApiProperty({ 
    description: 'Observaciones o notas generales sobre la orden de compra.', 
    example: 'Pago a 30 días contra factura.', 
    required: false 
  })
  readonly observaciones?: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID del estado actual de la orden (ej: 1=Pendiente, 2=Aprobada, 3=Recibida Parcial, 4=Recibida Total) (FK a la tabla estados).', 
    example: 1 
  })
  readonly estado: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ 
    description: 'Estado activo/inactivo del registro de la orden.', 
    example: true, 
    default: true
  })
  readonly activo: boolean = true;
}