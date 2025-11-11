import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from './register.dto';

/**
 * DTO utilizado para actualizar los datos de un usuario.
 * * Extiende PartialType de RegisterDto, haciendo que todas las 
 * propiedades del registro (como email, password, nombre, etc.) sean opcionales.
 * Esto permite que el cliente envíe solo los campos que desea modificar.
 */
export class UpdateUserDto extends PartialType(RegisterDto) {}