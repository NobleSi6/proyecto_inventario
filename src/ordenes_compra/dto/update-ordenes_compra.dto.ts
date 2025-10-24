import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdenesCompraDto } from './create-ordenes_compra.dto';

export class UpdateOrdenesCompraDto extends PartialType(CreateOrdenesCompraDto) {}
