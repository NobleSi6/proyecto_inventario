import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, Min, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStockDto {
  
  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID del material al que se refiere este stock (FK a la tabla materiales).', 
    example: 1 
  })
  readonly id_material: number;

  @IsInt()
  @IsPositive()
  @ApiProperty({ 
    description: 'ID del almacén donde se encuentra este stock (FK a la tabla almacenes).', 
    example: 3 
  })
  readonly id_almacen: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 3 }) 
  @Min(0)
  @ApiProperty({ 
    description: 'Cantidad de material disponible para su uso o retiro inmediato.', 
    example: 150.755, 
    minimum: 0,
    required: false 
  })
  readonly cantidad_disponible?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 3 }) 
  @Min(0)
  @ApiProperty({ 
    description: 'Cantidad de material que ha sido comprometido o reservado para órdenes/proyectos futuros.', 
    example: 20.00, 
    minimum: 0,
    required: false 
  })
  readonly cantidad_reservada?: number;

  @IsOptional() 
  @IsBoolean()
  @ApiProperty({ 
    description: 'Estado activo del registro de stock. Un registro inactivo puede indicar que el material ya no se maneja en ese almacén.', 
    example: true, 
    default: true,
    required: false
  })
  readonly activo?: boolean = true;
}