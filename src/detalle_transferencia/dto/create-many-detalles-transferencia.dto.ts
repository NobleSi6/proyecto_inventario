import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { CreateDetalleTransferenciaDto } from './create-detalle-transferencia.dto';

export class CreateManyDetallesTransferenciaDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleTransferenciaDto)
  items: CreateDetalleTransferenciaDto[];
}