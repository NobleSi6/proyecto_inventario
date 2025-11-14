import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class CreateSalidaDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  numero_salida: string;

  @IsOptional() @IsInt()
  id_almacen?: number;

  @IsOptional() @IsInt()
  id_proyecto?: number;

  @IsOptional() @IsInt()
  id_empleado_autoriza?: number;

  @IsOptional() @IsInt()
  id_empleado_retira?: number;

  // Accept either ISO date or omit to use DB default
  @IsOptional() @IsDateString()
  fecha_salida?: string;

  @IsOptional() @IsString() @MaxLength(50)
  tipo_salida?: string;

  @IsOptional() @IsString()
  observaciones?: string;

  @IsOptional() @IsBoolean()
  activo?: boolean = true;
}