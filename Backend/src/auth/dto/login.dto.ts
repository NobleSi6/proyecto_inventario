// src/auth/dto/login.dto.ts (AJUSTADO)

import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
    
    @IsString()
    @IsNotEmpty()
    username: string; // ✅ Usamos 'username' para el campo de acceso

    @IsString()
    @IsNotEmpty()
    password: string;
}