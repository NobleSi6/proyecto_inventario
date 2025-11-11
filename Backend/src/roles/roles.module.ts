// src/roles/roles.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';
import { Rol } from './rol.entity';
import { RolesService } from './roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rol])], // Importa el repositorio de la entidad Rol
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService], // Opcional: Exporta el servicio si otros módulos lo usarán
})
export class RolesModule {}