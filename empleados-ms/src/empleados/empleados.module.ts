import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmpleadosService } from './empleados.service';
import { EmpleadosController } from './empleados.controller';
import { Empleado } from './empleados.entity';
import { RolesModule } from '../roles/roles.module';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Empleado]),

    // Si RolesModule o UsuariosModule dependen del módulo de empleados, usamos forwardRef
    forwardRef(() => RolesModule),
    forwardRef(() => UsuariosModule),
  ],
  controllers: [EmpleadosController],
  providers: [EmpleadosService],
  exports: [EmpleadosService],
})
export class EmpleadosModule {}
