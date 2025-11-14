import { IsOptional, IsDateString, IsNumber } from 'class-validator';

export class TopProductsDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsNumber()
  projectId?: number;

  @IsOptional()
  @IsNumber()
  limit?: number = 5; // Por defecto, top 5 productos
}