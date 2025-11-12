import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importamos ApiProperty

export class CreateDetalleTransferenciaDto {

  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID de la Transferencia a la que pertenece este detalle (FK). Opcional si se crea junto con la cabecera.', 
    example: 12,
    required: false
  })
  readonly id_transferencia?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID del material que se está transfiriendo (FK a la tabla materiales).', 
    example: 7,
    required: false 
  })
  readonly id_material?: number;

  @IsNumber({ maxDecimalPlaces: 3 })
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ 
    description: 'Cantidad del material que se solicitó transferir.', 
    example: 25.0, 
    minimum: 0.001 
  })
  readonly cantidad: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 3 }) // Usar 3 decimales para consistencia con cantidad
  @Min(0)
  @ApiProperty({ 
    description: 'Cantidad del material que fue recibida por el almacén destino. Es opcional durante la creación.', 
    example: 25.0,
    required: false 
  })
  readonly cantidad_recibida?: number;

  @IsOptional() 
  @IsString()
  @MaxLength(5000)
  @ApiProperty({ 
    description: 'Observaciones adicionales sobre el detalle de la transferencia.', 
    example: 'Material delicado, manejar con cuidado.', 
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