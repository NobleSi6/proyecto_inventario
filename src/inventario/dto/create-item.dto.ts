import { IsString, IsNotEmpty, IsNumber, Min, IsInt } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  sku: string; // Código de inventario

  @IsString()
  @IsNotEmpty()
  nombre: string; // Nombre material

  @IsString()
  descripcion: string; 

  @IsString()
  @IsNotEmpty()
  unidadMedida: string; // Unidad de medida

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  cantidad: number; // Cantidad inicial (stock_actual)

  @IsNumber()
  @Min(0)
  costoUnitario: number;

  @IsString()
  estado: string = 'NUEVO'; // Estado (ej. 'NUEVO')

    // Nuevo campo de texto para la ubicación
  @IsString()
  @IsNotEmpty()
  ubicacionInterna: string; 
}