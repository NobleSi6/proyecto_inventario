// src/projects/projects.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from './Project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project])], // Registra la entidad
  controllers: [ProjectsController],
  providers: [ProjectsService],
  // Opcional: exporta el servicio si otros módulos lo van a usar
  exports: [ProjectsService],
})
export class ProjectsModule {}