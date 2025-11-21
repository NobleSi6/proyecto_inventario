import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './roles.entity';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rol]), // importa la entidad Rol para TypeORM
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService], // exporta RolesService para usarlo en otros módulos (Empleados, Usuarios)
})
export class RolesModule {}
