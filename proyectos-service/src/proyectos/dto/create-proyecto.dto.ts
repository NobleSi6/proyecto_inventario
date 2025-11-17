// proyectos-service/src/proyectos/dto/create-proyecto.dto.ts
import { IsString, IsNumber, IsOptional, IsBoolean, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProyectoDto {
  @ApiProperty({ description: 'Código único del proyecto', example: 'PROY-2024-001' })
  @IsString()
  codigo: string;

  @ApiProperty({ description: 'Nombre del proyecto', example: 'Construcción Edificio Central' })
  @IsString()
  nombre: string;

  @ApiPropertyOptional({ description: 'Descripción detallada del proyecto' })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiPropertyOptional({ description: 'Dirección del proyecto' })
  @IsString()
  @IsOptional()
  direccion?: string;

  @ApiPropertyOptional({ description: 'Ciudad donde se ejecuta el proyecto', example: 'La Paz' })
  @IsString()
  @IsOptional()
  ciudad?: string;

  @ApiPropertyOptional({ description: 'Fecha de inicio del proyecto', example: '2024-01-15' })
  @IsDateString()
  @IsOptional()
  fecha_inicio?: string;

  @ApiPropertyOptional({ description: 'Fecha estimada de finalización', example: '2024-12-31' })
  @IsDateString()
  @IsOptional()
  fecha_fin_estimada?: string;

  @ApiPropertyOptional({ description: 'Presupuesto del proyecto', example: 500000.00 })
  @IsNumber()
  @IsOptional()
  presupuesto?: number;

  @ApiProperty({ description: 'ID del empleado responsable', example: 1 })
  @IsNumber()
  responsable: number;

  @ApiProperty({ description: 'ID del estado del proyecto', example: 1 })
  @IsNumber()
  estado: number;

  @ApiPropertyOptional({ description: 'Indica si el proyecto está activo', default: true })
  @IsBoolean()
  @IsOptional()
  activo?: boolean = true;
}