// src/reports/dto/top-products.dto.ts
import { IsOptional, IsDateString, IsNumber } from 'class-validator';
// 🚨 Importar Type de class-transformer
import { Type } from 'class-transformer'; 

export class TopProductsDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  // 🚨 CORRECCIÓN 1: Convertir la entrada a Number antes de validar
  @Type(() => Number)
  @IsNumber()
  projectId?: number;

  @IsOptional()
  // 🚨 CORRECCIÓN 2: Convertir la entrada a Number antes de validar
  @Type(() => Number)
  @IsNumber()
  limit?: number = 5; 
}