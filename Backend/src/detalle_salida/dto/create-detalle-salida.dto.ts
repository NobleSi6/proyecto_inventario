import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDetalleSalidaDto {

  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID de la Salida de Inventario a la que pertenece este detalle (FK). Se omite si se crea junto con la cabecera.', 
    example: 15,
    required: false // Es opcional en este DTO
  })
  readonly id_salida?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID del material que se está retirando (FK a la tabla materiales).', 
    example: 3,
    required: false 
  })
  readonly id_material?: number;

  @IsNumber({ maxDecimalPlaces: 3 })
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ 
    description: 'Cantidad del material que está siendo retirado del stock.', 
    example: 45.0, 
    minimum: 0.001 
  })
  readonly cantidad: number;

  @IsOptional() 
  @IsString()
  @MaxLength(255)
  @ApiProperty({ 
    description: 'Observaciones adicionales sobre el detalle de la salida.', 
    example: 'Para uso en el nivel 5 del proyecto B.', 
    required: false 
  })
  readonly observaciones?: string;

  @IsOptional() 
  @IsBoolean()
  @ApiProperty({ 
    description: 'Estado activo/inactivo del registro de detalle.', 
    example: true, 
    default: true,
    required: false
  })
  readonly activo?: boolean = true;
}