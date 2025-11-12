import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, Length, MaxLength, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSalidaDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty({ 
    description: 'Número de identificación único de la salida de inventario.', 
    example: 'SAL-2025-00045' 
  })
  readonly numero_salida: string;

  @IsOptional() 
  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID del almacén de donde sale el material (FK a la tabla almacenes).', 
    example: 1, 
    required: false 
  })
  readonly id_almacen?: number;

  @IsOptional() 
  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID del proyecto o destino para el cual se retira el material (FK a la tabla proyectos).', 
    example: 7, 
    required: false 
  })
  readonly id_proyecto?: number;

  @IsOptional() 
  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID del empleado que autoriza la salida (FK a la tabla empleados).', 
    example: 12, 
    required: false 
  })
  readonly id_empleado_autoriza?: number;

  @IsOptional() 
  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID del empleado o persona que retira físicamente el material (FK a la tabla empleados).', 
    example: 15, 
    required: false 
  })
  readonly id_empleado_retira?: number;

  // Accept either ISO date or omit to use DB default
  @IsOptional() 
  @IsDateString()
  @ApiProperty({ 
    description: 'Fecha en la que se registra la salida. Si se omite, se usa la fecha actual.', 
    example: '2025-11-15T12:00:00Z', 
    required: false,
    type: String
  })
  readonly fecha_salida?: string;

  @IsOptional() 
  @IsString() 
  @MaxLength(50)
  @ApiProperty({ 
    description: 'Tipo de salida (ej: Consumo, Transferencia, Venta).', 
    example: 'Consumo', 
    required: false 
  })
  readonly tipo_salida?: string;

  @IsOptional() 
  @IsString()
  @MaxLength(500) // Se asume un MaxLength para las observaciones
  @ApiProperty({ 
    description: 'Observaciones o notas generales sobre la salida del inventario.', 
    example: 'Salida de material por urgencia en fase de cimentación.', 
    required: false 
  })
  readonly observaciones?: string;

  @IsOptional() 
  @IsBoolean()
  @ApiProperty({ 
    description: 'Estado activo/inactivo del registro de salida.', 
    example: true, 
    default: true,
    required: false
  })
  readonly activo?: boolean = true;
}