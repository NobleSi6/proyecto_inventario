// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // 👈 Importar
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [
    UsuariosModule,
    // Configuración de JWT: La llave secreta DEBE ser fuerte y estar en un .env
    JwtModule.register({
      secret: 'TU_SUPER_SECRET_KEY_DEBES_CAMBIARLA', // ⚠️ CAMBIA ESTO POR UNA VARIABLE DE ENTORNO
      signOptions: { expiresIn: '60m' }, // El token expira en 60 minutos
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule], // Exportar el servicio y el módulo JWT
})
export class AuthModule {}