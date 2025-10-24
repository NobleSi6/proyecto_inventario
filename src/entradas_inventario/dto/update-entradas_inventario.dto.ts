import { PartialType } from '@nestjs/mapped-types';
import { CreateEntradasInventarioDto } from './create-entradas_inventario.dto';

export class UpdateEntradasInventarioDto extends PartialType(CreateEntradasInventarioDto) {}
