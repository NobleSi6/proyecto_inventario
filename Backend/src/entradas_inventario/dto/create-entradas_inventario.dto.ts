import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEntradaInventarioDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({ 
    description: 'Número de identificación único de la entrada de inventario.', 
    example: 'E-2025-00123' 
  })
  readonly numero_entrada: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID del almacén donde se recibe el material (FK a la tabla almacenes).', 
    example: 2 
  })
  readonly id_almacen: number;

  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID de la orden de compra asociada a esta entrada (FK a la tabla ordenes_compra).', 
    example: 8 
  })
  readonly id_orden_compra: number;

  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID del empleado que recibe el material (FK a la tabla empleados).', 
    example: 15 
  })
  readonly id_empleado_recibe: number;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ 
    description: 'Fecha en la que se registra la entrada. Si se omite, se usa la fecha actual.', 
    example: '2025-11-10T10:00:00Z', 
    required: false,
    type: String
  })
  readonly fecha_entrada?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ 
    description: 'Tipo de entrada (ej: Compra, Devolución, Ajuste).', 
    example: 'Compra', 
    required: false 
  })
  readonly tipo_entrada?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  @ApiProperty({ 
    description: 'Observaciones o notas generales sobre el proceso de entrada.', 
    example: 'Recepción conforme, material verificado contra factura 456.', 
    required: false 
  })
  readonly observaciones?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ 
    description: 'Estado activo/inactivo del registro de entrada.', 
    example: true, 
    default: true
  })
  readonly activo: boolean = true;
}