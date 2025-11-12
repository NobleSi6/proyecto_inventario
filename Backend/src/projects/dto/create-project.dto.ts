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
  IsPositive, // Agregado para asegurar que los IDs y el presupuesto sean positivos
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  // id_proyecto (SERIAL PRIMARY KEY) - No se incluye, lo genera la DB

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    description: 'Código único de identificación del proyecto.',
    example: 'PROY-A3-2025'
  })
  codigo: string; // varchar(50)

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @ApiProperty({
    description: 'Nombre descriptivo del proyecto.',
    example: 'Construcción Torre Empresarial C'
  })
  nombre: string; // varchar(200)

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Descripción detallada del alcance y objetivos del proyecto.',
    required: false
  })
  descripcion?: string; // text

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Dirección física completa donde se lleva a cabo el proyecto.',
    example: 'Av. Libertador #1234, Zona Central',
    required: false
  })
  direccion?: string; // text

  @IsString()
  @IsOptional()
  @MaxLength(100)
  @ApiProperty({
    description: 'Ciudad o municipio donde se localiza el proyecto.',
    example: 'La Paz',
    required: false
  })
  ciudad?: string; // varchar(100)

  // Nota: Usamos IsDateString para validar el formato de entrada de la fecha (ISO 8601)
  @IsDateString()
  @IsOptional()
  @ApiProperty({
    description: 'Fecha de inicio programada del proyecto.',
    example: '2025-03-01',
    type: String, // Documenta el tipo correcto para Swagger UI
    required: false
  })
  fecha_inicio?: Date; // date

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    description: 'Fecha de finalización estimada del proyecto.',
    example: '2026-03-31',
    type: String,
    required: false
  })
  fecha_fin_estimada?: Date; // date

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    description: 'Fecha real en la que el proyecto fue completado.',
    example: '2026-03-28',
    type: String,
    required: false
  })
  fecha_fin_real?: Date; // date

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @Min(0)
  @ApiProperty({
    description: 'Presupuesto total asignado al proyecto.',
    example: 500000.00,
    minimum: 0,
    required: false
  })
  presupuesto?: number; // numeric(15,2)

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'Estado de actividad del proyecto.',
    example: true,
    default: true,
    required: false
  })
  activo?: boolean = true; // boolean

  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty({
    description: 'ID del empleado responsable principal del proyecto (FK).',
    example: 5,
    required: false
  })
  responsable?: number; // int (FK)

  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty({
    description: 'ID del estado actual del proyecto (FK a la tabla estados, ej: 1=Activo, 2=Finalizado).',
    example: 1,
    required: false
  })
  estado?: number; // int (FK)
}