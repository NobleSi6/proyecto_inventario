import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlmacenDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty({ description: 'Nombre del almacen', example: 'Almacen abc' })
  readonly nombre: string;

  @IsOptional() @IsString()
  @MaxLength(50)
@ApiProperty({ description: 'codigo del almacen', example: 'AMC-000' })
  readonly codigo?: string;

  @IsOptional() @IsString()
@ApiProperty({ description: 'direccion del almacen', example: 'Zona_nombre/Calle_nombre/#' })
  readonly direccion?: string;

  @IsOptional() @IsString() @MaxLength(100)
  @ApiProperty({ description: 'Ciudad donde esta el almacen', example: 'La Paz' })
  readonly ciudad?: string;

  @IsOptional() @IsString() @MaxLength(20)
  @ApiProperty({ description: 'Contacto del almacen', example: '65432198' })
  readonly telefono?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  @ApiProperty({ description: 'Capacidad maxima del almacen en m3', example: '100' })
  readonly capacidad_m3?: number;

  @IsOptional() @IsBoolean()
  readonly activo?: boolean = true;

  @IsInt()
  @IsPositive()
  @ApiProperty({ description: 'ID del empleado responsable del almacén (FK a la tabla empleados)', example: 1 })
  readonly responsable: number;
}