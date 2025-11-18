import { IsString, IsNotEmpty, IsOptional, IsEmail, Length } from 'class-validator';

export class CreateProveedorDto {
  @IsString()
  @Length(1, 150) // Validamos la longitud máxima de 150
  @IsNotEmpty()
  readonly nombre: string; // 🚨 CORRECCIÓN: Debe ser 'nombre' y es obligatorio

  @IsString()
  @Length(1, 20) // Validamos la longitud máxima de 20
  @IsNotEmpty()
  // 🚨 CRÍTICO: Se eliminó IsOptional(). 'nit' es NOT NULL en la DB.
  readonly nit: string; 

  // La DB solo tiene 'contacto', no 'contacto_nombre' o 'contacto_telefono'.
  @IsString()
  @IsOptional()
  @Length(1, 100)
  readonly contacto?: string;

  @IsString()
  @IsOptional()
  @Length(1, 20)
  readonly telefono?: string;

  @IsEmail()
  @IsOptional()
  @Length(1, 100)
  readonly email?: string; 

  @IsString()
  @IsOptional()
  readonly direccion?: string; 
  
  // 🚨 Eliminamos 'ciudad', 'pais', 'contacto_nombre', 'contacto_telefono' y 'activo'
  // ya que no están en la DB o se gestionan por defecto.
}