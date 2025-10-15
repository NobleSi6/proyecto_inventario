import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAlmacenDto {
  @IsString()
  @IsNotEmpty()
  nombre: string; // Nombre del almacén o bodega (e.g., 'Almacén Principal')

  @IsString()
  @IsOptional()
  descripcion: string; // Descripción o función del almacén

  @IsString()
  @IsOptional()
  ubicacionFisica: string; // Dirección o ubicación dentro de la empresa

  @IsBoolean()
  @IsOptional()
  estaActivo: boolean = true; // Estado de actividad del almacén
}