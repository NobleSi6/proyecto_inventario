import { Controller, Post, Body, Get, Put, Param, Delete, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { UsuariosClientService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosClient: UsuariosClientService) {}

  // Crear usuario (envía datos al microservicio)
  @Post()
  async create(@Body() payload: any) {
    try {
      const response = await this.usuariosClient.crearUsuario(payload);
      return {
        status: response?.status || 'success',
        message: response?.message || 'Usuario creado correctamente',
        data: response?.data || null,
      };
    } catch (error) {
      throw new HttpException(
        { status: 'error', message: error?.response?.message || error.message || 'Error al crear usuario' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Listar todos los usuarios
  @Get()
  async findAll() {
    try {
      const response = await this.usuariosClient.listarUsuarios();
      const data = response?.data || [];
      return {
        status: response?.status || 'success',
        count: Array.isArray(data) ? data.length : 0,
        data,
      };
    } catch (error) {
      throw new HttpException(
        { status: 'error', message: error?.response?.message || error.message || 'Error al listar usuarios' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Actualizar usuario por ID
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: any) {
    try {
      const response = await this.usuariosClient.actualizarUsuario(id, payload);
      return {
        status: response?.status || 'success',
        message: response?.message || 'Usuario actualizado correctamente',
        data: response?.data || null,
      };
    } catch (error) {
      throw new HttpException(
        { status: 'error', message: error?.response?.message || error.message || 'Error al actualizar usuario' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Eliminar usuario por ID
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const response = await this.usuariosClient.eliminarUsuario(id);
      return {
        status: response?.status || 'success',
        message: response?.message || 'Usuario eliminado correctamente',
      };
    } catch (error) {
      throw new HttpException(
        { status: 'error', message: error?.response?.message || error.message || 'Error al eliminar usuario' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
