import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleEntradaDto } from './create-detalle_entrada.dto';

export class UpdateDetalleEntradaDto extends PartialType(CreateDetalleEntradaDto) {}
