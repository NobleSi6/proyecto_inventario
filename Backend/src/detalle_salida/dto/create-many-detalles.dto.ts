import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // <-- Importamos ApiProperty
import { CreateDetalleSalidaDto } from './create-detalle-salida.dto';

export class CreateManyDetallesDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleSalidaDto)
  @ApiProperty({
    description: 'Lista de detalles de materiales a incluir en la salida.',
    type: [CreateDetalleSalidaDto], // <-- Indica que es un array del tipo de DTO
    example: [ // Ejemplo de cómo se vería el array en el cuerpo de la petición
        { id_material: 1, cantidad: 50, observaciones: 'Cemento para columna 1' },
        { id_material: 2, cantidad: 10, observaciones: 'Varilla de 1/2' }
    ]
  })
  items: CreateDetalleSalidaDto[];
}