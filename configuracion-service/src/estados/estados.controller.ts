// configuracion-service/src/estados/estados.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { EstadosService } from './estados.service';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';

@ApiTags('estados')
@Controller('estados')
export class EstadosController {
  constructor(private readonly estadosService: EstadosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo estado' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Estado creado exitosamente' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos inválidos' })
  create(@Body() createEstadoDto: CreateEstadoDto) {
    return this.estadosService.create(createEstadoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los estados' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista de estados' })
  findAll() {
    return this.estadosService.findAll();
  }

  @Get('activos')
  @ApiOperation({ summary: 'Obtener solo estados activos' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista de estados activos' })
  findActivos() {
    return this.estadosService.findActivos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un estado por ID' })
  @ApiParam({ name: 'id', description: 'ID del estado' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Estado encontrado' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Estado no encontrado' })
  findOne(@Param('id') id: string) {
    return this.estadosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un estado' })
  @ApiParam({ name: 'id', description: 'ID del estado' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Estado actualizado' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Estado no encontrado' })
  update(@Param('id') id: string, @Body() updateEstadoDto: UpdateEstadoDto) {
    return this.estadosService.update(+id, updateEstadoDto);
  }

  @Delete(':id')
  @Delete(':id')
  @ApiOperation({ summary: 'Desactivar un estado (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID del estado' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Estado desactivado' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Estado no encontrado' })
  remove(@Param('id') id: string) {
    return this.estadosService.remove(+id);
  }
}