import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller() // No necesitas ruta HTTP, el API Gateway se comunica vía microservicio
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // Crear usuario
  @MessagePattern({ cmd: 'usuario_crear' })
  async crearUsuario(@Payload() dto: CreateUsuarioDto) {
    try {
      const user = await this.usuariosService.create(dto);
      return { status: 'success', message: 'Usuario creado correctamente', data: user };
    } catch (error) {
      throw new HttpException(
        { status: 'error', message: error.message || 'Error al crear usuario' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Listar todos los usuarios
  @MessagePattern({ cmd: 'usuario_listar' })
  async listarUsuarios() {
    try {
      const users = await this.usuariosService.findAll();
      return { status: 'success', count: users.length, data: users };
    } catch (error) {
      throw new HttpException(
        { status: 'error', message: error.message || 'Error al listar usuarios' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Actualizar usuario
  @MessagePattern({ cmd: 'usuario_actualizar' })
  async actualizarUsuario(@Payload() payload: { id: number; [key: string]: any }) {
    try {
      const { id, ...dto } = payload;
      const updated = await this.usuariosService.update(id, dto as UpdateUsuarioDto);
      return { status: 'success', message: 'Usuario actualizado correctamente', data: updated };
    } catch (error) {
      throw new HttpException(
        { status: 'error', message: error.message || 'Error al actualizar usuario' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Eliminar usuario
  @MessagePattern({ cmd: 'usuario_eliminar' })
  async eliminarUsuario(@Payload() payload: { id: number }) {
    try {
      await this.usuariosService.remove(payload.id);
      return { status: 'success', message: 'Usuario eliminado correctamente' };
    } catch (error) {
      throw new HttpException(
        { status: 'error', message: error.message || 'Error al eliminar usuario' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
