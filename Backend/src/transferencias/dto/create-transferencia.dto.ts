import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, Length, MaxLength, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransferenciaDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty({ 
    description: 'Número de identificación único de la transferencia de inventario.', 
    example: 'TRANS-2025-015' 
  })
  readonly numero_transferencia: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ 
    description: 'ID del almacén de donde sale el material (origen) (FK a la tabla almacenes).', 
    example: 1 
  })
  readonly id_almacen_origen: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ 
    description: 'ID del almacén al que se envía el material (destino) (FK a la tabla almacenes).', 
    example: 3 
  })
  readonly id_almacen_destino: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ 
    description: 'ID del empleado que autoriza el movimiento (FK a la tabla empleados).', 
    example: 10, 
    required: false
  })
  readonly id_empleado_autoriza: number;

  @IsOptional() 
  @IsDateString()
  @ApiProperty({ 
    description: 'Fecha en la que se registra la transferencia.', 
    example: '2025-11-20T10:00:00Z', 
    required: false,
    type: String
  })
  readonly fecha_transferencia: string;

  @IsOptional() 
  @IsDateString()
  @ApiProperty({ 
    description: 'Fecha en la que el almacén de destino confirma la recepción de los materiales.', 
    example: '2025-11-21T09:30:00Z', 
    required: false,
    type: String
  })
  readonly fecha_recepcion: string;

  @IsOptional() 
  @IsString() 
  @MaxLength(5000)
  @ApiProperty({ 
    description: 'Observaciones o notas generales sobre el proceso de transferencia.', 
    example: 'Materiales embalados según procedimiento de seguridad.', 
    required: false,
    maxLength: 5000
  })
  readonly observaciones?: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID del estado actual de la transferencia (ej: 1=Solicitada, 2=Enviada, 3=Recibida) (FK a la tabla estados).', 
    example: 2 
  })
  readonly estado: number;

  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID del empleado que solicita la transferencia (FK a la tabla empleados).', 
    example: 5
  })
  readonly id_empleado_solicitante: number;

  @IsOptional() 
  @IsBoolean()
  @ApiProperty({ 
    description: 'Estado activo/inactivo del registro de transferencia.', 
    example: true, 
    default: true,
    required: false
  })
  readonly activo?: boolean = true;
}