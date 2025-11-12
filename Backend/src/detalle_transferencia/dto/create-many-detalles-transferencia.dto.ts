import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // <-- Importamos ApiProperty
import { CreateDetalleTransferenciaDto } from './create-detalle-transferencia.dto';

export class CreateManyDetallesTransferenciaDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleTransferenciaDto)
  @ApiProperty({
    description: 'Lista de materiales a transferir. Cada elemento es un detalle de la transferencia.',
    type: [CreateDetalleTransferenciaDto], // Indica que el cuerpo es un array de este DTO
    example: [
        { id_material: 4, cantidad: 100, observaciones: 'Uso urgente' },
        { id_material: 9, cantidad: 50, cantidad_recibida: 50 }
    ]
  })
  items: CreateDetalleTransferenciaDto[];
}