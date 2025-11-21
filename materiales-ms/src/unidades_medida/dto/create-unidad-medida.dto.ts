import { IsString, IsBoolean, IsOptional, Length } from 'class-validator';

export class CreateUnidadMedidaDto {
  @IsString()
  @Length(1, 100)
  nombre: string;

  @IsString()
  @Length(1, 10)
  abreviatura: string;

  @IsString()
  @Length(1, 50)
  tipo: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
