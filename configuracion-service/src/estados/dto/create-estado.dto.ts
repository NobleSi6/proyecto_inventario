// configuracion-service/src/estados/dto/create-estado.dto.ts
import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEstadoDto {
  @ApiProperty({ 
    description: 'Tipo de estado', 
    example: 'Pendiente',
    examples: ['Pendiente', 'En Proceso', 'Completado', 'Cancelado']
  })
  @IsString()
  tipo_estado: string;

  @ApiPropertyOptional({ 
    description: 'Indica si el estado está activo', 
    default: true 
  })
  @IsBoolean()
  @IsOptional()
  activo?: boolean = true;
}