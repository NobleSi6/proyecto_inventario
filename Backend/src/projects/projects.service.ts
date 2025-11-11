// src/projects/projects.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './Project.entity';
import { CreateProjectDto } from './dto/create-project.dto';

// Define un DTO para la creación (mejor práctica)
// import { CreateProjectDto } from './dto/create-project.dto'; 

@Injectable()
export class ProjectsService {
  constructor(
    // Inyecta el repositorio de la entidad Project
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

// 2. Usa CreateProjectDto
  async create(projectData: CreateProjectDto): Promise<Project> {
    const newProject = this.projectsRepository.create(projectData);
    return this.projectsRepository.save(newProject);
  }


// Obtener todos los proyectos
  findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

// Obtener un proyecto por ID
// Cambia Promise<Project> por Promise<Project | null>
findOne(id: number): Promise<Project | null> { 
    return this.projectsRepository.findOneBy({ id });
}

  // Actualizar un proyecto
  async update(id: number, updateData: any): Promise<Project|null> {
    await this.projectsRepository.update(id, updateData);
    return this.findOne(id); // Opcional: devuelve el proyecto actualizado
  }


  // Eliminar un proyecto
  async remove(id: number): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}