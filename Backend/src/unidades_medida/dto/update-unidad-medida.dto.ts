import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateUnidadMedidaDto } from './create-unidad-medida.dto';

export class UpdateUnidadMedidaDto extends PartialType(CreateUnidadMedidaDto) {
  // Se añade 'activo' para permitir cambiar el estado de la unidad de medida.
  @IsBoolean()
  @IsOptional()
  readonly activo?: boolean;
}