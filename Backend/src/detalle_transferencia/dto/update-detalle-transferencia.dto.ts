import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleTransferenciaDto } from './create-detalle-transferencia.dto';

export class UpdateDetalleTransferenciaDto extends PartialType(CreateDetalleTransferenciaDto) {}