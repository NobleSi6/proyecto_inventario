import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateEstadoDto } from './create-estado.dto';

export class UpdateEstadoDto extends PartialType(CreateEstadoDto) {
  // Solo si queremos permitir explícitamente la actualización del estado activo/inactivo
  @IsBoolean()
  @IsOptional()
  readonly activo?: boolean;
}