import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { CreateDetalleSalidaDto } from './create-detalle-salida.dto';

export class CreateManyDetallesDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleSalidaDto)
  items: CreateDetalleSalidaDto[];
}