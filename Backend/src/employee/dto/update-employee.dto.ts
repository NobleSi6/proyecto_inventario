import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';

/**
 * El DTO para actualizar un empleado.
 * * PartialType toma el CreateEmployeeDto y hace que todas sus 
 * propiedades sean opcionales, lo que es ideal para las operaciones PATCH 
 * donde solo se envían los campos que se quieren modificar.
 */
export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}