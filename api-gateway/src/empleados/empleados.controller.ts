import { Controller, Get, Post, Patch, Delete, Param, Body, Inject, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('empleados')
export class EmpleadosController {
  constructor(
    @Inject('USUARIOS_SERVICE') private readonly client: ClientProxy, // microservicio usuarios
  ) {}

  @Get()
  async listar() {
    try {
      const result = await lastValueFrom(
        this.client.send({ cmd: 'empleado_listar' }, {}) // sin payload, solo cmd
      );
      return { status: 'success', count: Array.isArray(result.data) ? result.data.length : 0, data: result.data };
    } catch (error) {
      throw new HttpException(error.message || 'Error al listar empleados', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async buscar(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await lastValueFrom(
        this.client.send({ cmd: 'empleado_buscar' }, { id }) // enviamos objeto con { id }
      );
      return { status: 'success', data: result.data };
    } catch (error) {
      throw new HttpException(error.message || 'Empleado no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async crear(@Body() dto: any) {
    try {
      const result = await lastValueFrom(
        this.client.send({ cmd: 'empleado_crear' }, { dto }) // enviamos { dto }
      );
      return { status: 'success', message: 'Empleado creado correctamente', data: result.data };
    } catch (error) {
      throw new HttpException(error.message || 'Error al crear empleado', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: any) {
    try {
      const result = await lastValueFrom(
        this.client.send({ cmd: 'empleado_actualizar' }, { id, dto }) // enviamos { id, dto }
      );
      return { status: 'success', message: 'Empleado actualizado correctamente', data: result.data };
    } catch (error) {
      throw new HttpException(error.message || 'Error al actualizar empleado', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await lastValueFrom(
        this.client.send({ cmd: 'empleado_eliminar' }, { id }) // enviamos { id }
      );
      return { status: 'success', message: 'Empleado eliminado correctamente', data: result.data };
    } catch (error) {
      throw new HttpException(error.message || 'Error al eliminar empleado', HttpStatus.BAD_REQUEST);
    }
  }
}
