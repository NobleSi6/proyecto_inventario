import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMaterialDto {
  
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty({ 
    description: 'Código de identificación único del material.', 
    example: 'CMT-BL-42.5' 
  })
  codigo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @ApiProperty({ 
    description: 'Nombre completo del material.', 
    example: 'Cemento Portland Tipo I - Bolsas 50kg' 
  })
  nombre: string;

  @IsOptional() 
  @IsString()
  @MaxLength(500) // Se asumió un MaxLength razonable para la descripción
  @ApiProperty({ 
    description: 'Descripción detallada del material y sus especificaciones.', 
    example: 'Cemento de alta resistencia para estructuras de hormigón.', 
    required: false 
  })
  descripcion?: string;

  @IsOptional() 
  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID de la categoría a la que pertenece el material (FK).', 
    example: 1, 
    required: false 
  })
  id_categoria?: number;

  @IsOptional() 
  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID de la unidad de medida (ej: kg, unidad, m3) (FK).', 
    example: 3, 
    required: false 
  })
  id_unidad?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }) 
  @Min(0)
  @ApiProperty({ 
    description: 'Precio unitario actual (moneda).', 
    example: 85.50, 
    minimum: 0,
    required: false 
  })
  precio_unitario?: number;

  @IsOptional() 
  @IsNumber({ maxDecimalPlaces: 3 }) // Se ajustó a 3 decimales para consistencia de inventario
  @Min(0)
  @ApiProperty({ 
    description: 'Nivel mínimo de stock para generar una alerta.', 
    example: 50, 
    minimum: 0,
    required: false 
  })
  stock_minimo?: number;

  @IsOptional() 
  @IsInt() 
  @Min(0)
  @ApiProperty({ 
    description: 'Nivel máximo de stock permitido en el almacén.', 
    example: 1000, 
    minimum: 0,
    required: false 
  })
  stock_maximo?: number;

  @IsOptional() 
  @IsString() 
  @MaxLength(100)
  @ApiProperty({ 
    description: 'Ubicación física preferente dentro del almacén (ej: Rack A1, Estantería 3).', 
    example: 'S-4-A', 
    required: false 
  })
  ubicacion_almacen?: string;

  @IsOptional() 
  @IsBoolean()
  @ApiProperty({ 
    description: 'Estado activo del material.', 
    example: true, 
    default: true,
    required: false 
  })
  activo?: boolean = true;
}