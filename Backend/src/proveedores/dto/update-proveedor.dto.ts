import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator'; // Importamos validadores
import { CreateProveedorDto } from './create-proveedor.dto';

export class UpdateProveedorDto extends PartialType(CreateProveedorDto) {
  // ADICIÓN: Permite actualizar el estado de actividad del proveedor
  @IsBoolean()
  @IsOptional()
  readonly activo?: boolean; 
}