import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  exports: [TypeOrmModule.forFeature([Usuario])], // Exportamos para que otros módulos (Auth) lo puedan usar
})
export class UsuariosModule {}