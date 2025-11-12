import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto'; // Asumo la existencia de este DTO (PartialType)
// Importamos los decoradores de Swagger
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('proyectos')
@Controller('proyectos')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo proyecto en el catálogo.' })
  @ApiResponse({ status: 201, description: 'Proyecto creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos (ej: código duplicado).' })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene una lista de todos los proyectos.' })
  @ApiResponse({ status: 200, description: 'Lista de proyectos.' })
  findAll() {
    // Nota: Se recomienda agregar filtros y paginación (ApiQuery) si la lista es grande.
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene los detalles de un proyecto por su ID.' })
  @ApiParam({ name: 'id', description: 'ID del proyecto.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Proyecto encontrado.' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const project = await this.projectsService.findOne(id);
    if (!project) {
      // Esta excepción es importante y la documentamos con ApiResponse 404
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza completamente un proyecto (Reemplazo total o PUT).' })
  @ApiParam({ name: 'id', description: 'ID del proyecto a actualizar.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Proyecto actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminación física (definitiva) de un proyecto.' })
  @ApiParam({ name: 'id', description: 'ID del proyecto a eliminar definitivamente.', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Proyecto eliminado definitivamente.' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado.' })
  @ApiResponse({ status: 409, description: 'Conflicto: No se puede eliminar por dependencia de FK (si tiene movimientos de inventario asociados).' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.remove(id);
  }
}