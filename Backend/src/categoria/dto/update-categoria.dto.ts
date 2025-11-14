import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateCategoriaDto } from './create-categoria.dto';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
  // Puedes reintroducir 'activo' aquí si quieres que la validación sea más estricta
  // sobre el tipo (aunque PartialType lo toma del base, es buena práctica si 
  // no lo incluiste en el base).
  @IsBoolean()
  @IsOptional()
  readonly activo?: boolean;
}