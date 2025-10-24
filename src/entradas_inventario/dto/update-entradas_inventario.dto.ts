import { PartialType } from '@nestjs/mapped-types';
import { CreateEntradaInventarioDto } from './create-entradas_inventario.dto';

export class UpdateEntradaInventarioDto extends PartialType(CreateEntradaInventarioDto) {}
