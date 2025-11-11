import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class CreateTransferenciaDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  numero_transferencia: string;

  @IsOptional() @IsInt()
  id_almacen_origen: number;

  @IsOptional() @IsInt()
  id_almacen_destino: number;

  @IsOptional() @IsInt()
  id_empleado_autoriza: number;

  @IsOptional() @IsDateString()
  fecha_transferencia: string;

  @IsOptional() @IsDateString()
  fecha_recepcion: string;

  @IsOptional() @IsString() @MaxLength(5000)
  observaciones?: string;

  @IsInt()
  estado: number;

  @IsInt()
  id_empleado_solicitante: number;

  @IsOptional() @IsBoolean()
  activo?: boolean = true;
}