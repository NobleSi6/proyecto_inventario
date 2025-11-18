import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateUnidadMedidaDto {
  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @Length(1, 20)
  @IsNotEmpty()
  // 🚨 CORRECCIÓN: Nombre de la columna en la BD es 'abreviacion'
  readonly abreviacion: string; 
  
  // 🚨 Eliminamos 'tipo' y 'activo'
}