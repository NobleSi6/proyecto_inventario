import { PartialType } from '@nestjs/mapped-types';
import { CreateAlmacenDto } from './create-almacen.dto';

// PartialType hace que todos los campos de CreateAlmacenDto sean opcionales
// Usamos este DTO para las operaciones de actualización (PUT/PATCH)
export class UpdateAlmacenDto extends PartialType(CreateAlmacenDto) {}