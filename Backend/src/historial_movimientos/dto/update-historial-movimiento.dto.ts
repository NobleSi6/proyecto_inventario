import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialMovimientoDto } from './create-historial-movimiento.dto';

export class UpdateHistorialMovimientoDto extends PartialType(CreateHistorialMovimientoDto) {}