// src/projects/dto/create-project.dto.ts

import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsDateString,
  IsNumber,
  IsBoolean,
  Min,
  IsInt,
} from 'class-validator';

export class CreateProjectDto {
  // id_proyecto (SERIAL PRIMARY KEY) - No se incluye, lo genera la DB

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  codigo: string; // varchar(50)

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nombre: string; // varchar(200)

  @IsString()
  @IsOptional()
  descripcion?: string; // text

  @IsString()
  @IsOptional()
  direccion?: string; // text

  @IsString()
  @IsOptional()
  @MaxLength(100)
  ciudad?: string; // varchar(100)

  @IsDateString()
  @IsOptional()
  fecha_inicio?: Date; // date

  @IsDateString()
  @IsOptional()
  fecha_fin_estimada?: Date; // date

  // La fecha real de fin no debe establecerse al crear
  @IsDateString()
  @IsOptional()
  fecha_fin_real?: Date; // date

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @Min(0)
  presupuesto?: number; // numeric(15,2)

  @IsBoolean()
  @IsOptional()
  activo?: boolean; // boolean

  // fecha_creacion (TIMESTAMP) - No se incluye, se establece con DEFAULT CURRENT_TIMESTAMP

  @IsInt()
  @IsOptional()
  responsable?: number; // int (FK)

  @IsInt()
  @IsOptional()
  estado?: number; // int (FK)
}