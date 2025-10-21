// src/projects/projects.controller.ts
// src/projects/projects.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { ProjectsService } from './projects.service';
// 1. Importa los DTOs
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('proyectos')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  // 2. Usa CreateProjectDto
  create(@Body() createProjectDto: CreateProjectDto) {
    // NestJS automáticamente valida el 'body' con el DTO
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const project = await this.projectsService.findOne(+id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: any) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}