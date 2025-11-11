import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdenCompraDto } from './create-ordenes_compra.dto';

export class UpdateOrdenesCompraDto extends PartialType(CreateOrdenCompraDto) {}
