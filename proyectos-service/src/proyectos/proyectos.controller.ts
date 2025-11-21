// proyectos-service/src/proyectos/proyectos.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ProyectosService } from './proyectos.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';

@ApiTags('proyectos')
@Controller('proyectos')
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  // Endpoint de prueba para verificar conexión
  @Get('test-connection')
  @ApiOperation({ summary: 'Probar conexión a base de datos' })
  testConnection() {
    return this.proyectosService.testConnection();
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo proyecto' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Proyecto creado exitosamente' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos inválidos' })
  create(@Body() createProyectoDto: CreateProyectoDto) {
    return this.proyectosService.create(createProyectoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los proyectos' })
  @ApiQuery({ name: 'activo', required: false, type: Boolean, description: 'Filtrar por estado activo' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista de proyectos' })
  findAll(@Query('activo') activo?: string) {
    const activoBool = activo === 'true' ? true : activo === 'false' ? false : undefined;
    return this.proyectosService.findAll(activoBool);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un proyecto por ID' })
  @ApiParam({ name: 'id', description: 'ID del proyecto' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Proyecto encontrado' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Proyecto no encontrado' })
  findOne(@Param('id') id: string) {
    return this.proyectosService.findOne(+id);
  }

  @Get(':id/salidas')
  @ApiOperation({ summary: 'Obtener salidas de inventario asociadas al proyecto' })
  @ApiParam({ name: 'id', description: 'ID del proyecto' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista de salidas' })
  async getSalidasPorProyecto(@Param('id') id: string) {
    return this.proyectosService.getSalidasPorProyecto(+id);
  }

  @Get(':id/ordenes-compra')
  @ApiOperation({ summary: 'Obtener órdenes de compra asociadas al proyecto' })
  @ApiParam({ name: 'id', description: 'ID del proyecto' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista de órdenes de compra' })
  async getOrdenesCompraPorProyecto(@Param('id') id: string) {
    return this.proyectosService.getOrdenesCompraPorProyecto(+id);
  }

  @Get(':id/recursos-utilizados')
  @ApiOperation({ summary: 'Obtener resumen de recursos utilizados en el proyecto' })
  @ApiParam({ name: 'id', description: 'ID del proyecto' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resumen de recursos' })
  async getRecursosUtilizados(@Param('id') id: string) {
    return this.proyectosService.getRecursosUtilizados(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un proyecto' })
  @ApiParam({ name: 'id', description: 'ID del proyecto' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Proyecto actualizado' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Proyecto no encontrado' })
  update(@Param('id') id: string, @Body() updateProyectoDto: UpdateProyectoDto) {
    return this.proyectosService.update(+id, updateProyectoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Desactivar un proyecto (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID del proyecto' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Proyecto desactivado' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Proyecto no encontrado' })
  remove(@Param('id') id: string) {
    return this.proyectosService.remove(+id);
  }
}