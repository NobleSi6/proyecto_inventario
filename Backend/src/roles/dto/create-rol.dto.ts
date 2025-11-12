import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // <-- Importamos ApiProperty

export class CreateRolDto {
  @IsString({ message: 'El cargo debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El cargo no puede estar vacío.' })
  @MaxLength(50, { message: 'El cargo no puede exceder los 50 caracteres.' })
  @ApiProperty({
    description: 'Nombre o descripción del rol/cargo que desempeñará un empleado.',
    example: 'Gerente de Proyectos',
    maxLength: 50
  })
  cargo: string;
}