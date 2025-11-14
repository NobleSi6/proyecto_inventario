import { IsString, IsNotEmpty, IsOptional, IsEmail, IsBoolean } from 'class-validator';

export class CreateProveedorDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre_empresa: string; // Nombre actualizado

  @IsString()
  @IsOptional() // Ahora es opcional en la DB
  readonly nit?: string; 

  @IsString()
  @IsOptional()
  readonly telefono?: string; // Nombre actualizado

  @IsEmail()
  @IsOptional()
  readonly email?: string; 

  @IsString()
  @IsOptional()
  readonly direccion?: string; 

  @IsString()
  @IsOptional()
  readonly ciudad?: string; // Nuevo campo

  @IsString()
  @IsOptional()
  readonly pais?: string = 'bolivia'; // Nuevo campo con default en DB

  @IsString()
  @IsOptional()
  readonly contacto_nombre?: string; // Nuevo campo

  @IsString()
  @IsOptional()
  readonly contacto_telefono?: string; // Nuevo campo
  
  @IsBoolean()
  @IsOptional()
  readonly activo: boolean = true; // Campo de estado/actividad
}