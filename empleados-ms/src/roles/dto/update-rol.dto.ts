import { IsString, IsOptional, MaxLength, IsBoolean } from 'class-validator';

export class UpdateRolDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  tipo_cargo?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
