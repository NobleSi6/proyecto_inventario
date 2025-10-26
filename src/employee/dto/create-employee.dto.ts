// src/employee/dto/create-employee.dto.ts

import { 
  IsString, 
  IsEmail, 
  IsNotEmpty, 
  IsDateString, 
  IsBoolean,
  IsOptional,
  IsInt 
} from 'class-validator';
import { Type, Expose } from 'class-transformer'; // 💡 Importar Expose

@Expose() // Permite que todos los campos sean expuestos
export class CreateEmployeeDto {
  
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsNotEmpty()
  nombres: string;

  // Mapeo: ap_paterno (JSON) -> apPaterno (Propiedad DTO)
  @Expose({ name: 'ap_paterno' }) 
  @IsString()
  @IsNotEmpty()
  apPaterno: string; 

  // Mapeo: ap_materno (JSON) -> apMaterno (Propiedad DTO)
  @Expose({ name: 'ap_materno' })
  @IsString()
  @IsNotEmpty()
  apMaterno: string; 

  @IsString()
  @IsNotEmpty()
  ci: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  // Mapeo: fecha_contratacion (JSON) -> fechaContratacion (Propiedad DTO)
  @Expose({ name: 'fecha_contratacion' })
  @IsDateString()
  @IsNotEmpty()
  fechaContratacion: string; 

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  // Mapeo: id_usuario (JSON) -> idUsuario (Propiedad DTO)
  @Expose({ name: 'id_usuario' })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  idUsuario: number;

  // Mapeo: id_rol (JSON) -> idRol (Propiedad DTO)
  @Expose({ name: 'cargo' })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  idRol: number;
}