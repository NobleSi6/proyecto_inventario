import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { AuthModule } from '../auth/auth.module';
import { Usuario } from './usuarios.entity';
import { Rol } from '../roles/roles.entity'; // Importa la entidad Rol

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Rol]), // Ahora se incluye Rol
    forwardRef(() => AuthModule),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}


