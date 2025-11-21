import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, catchError } from 'rxjs';

@Injectable()
export class UsuariosClientService {
  constructor(
    @Inject('USUARIOS_SERVICE') private readonly client: ClientProxy,
  ) {}

  // Crear un usuario
  async crearUsuario(data: any) {
    const result = await lastValueFrom(
      this.client.send({ cmd: 'usuario_crear' }, data).pipe(
        catchError(err => {
          throw new HttpException(
            err?.response?.message || err.message || 'Error al crear usuario',
            HttpStatus.BAD_REQUEST,
          );
        }),
      ),
    );

    return {
      status: 'success',
      message: 'Usuario creado correctamente',
      data: result,
    };
  }

  // Listar todos los usuarios
  async listarUsuarios() {
    const result = await lastValueFrom(
      this.client.send({ cmd: 'usuario_listar' }, {}).pipe(
        catchError(err => {
          throw new HttpException(
            err?.response?.message || err.message || 'Error al listar usuarios',
            HttpStatus.BAD_REQUEST,
          );
        }),
      ),
    );

    return {
      status: 'success',
      count: Array.isArray(result) ? result.length : 0,
      data: result,
    };
  }

  // Actualizar un usuario por ID
  async actualizarUsuario(id: number, data: any) {
    const result = await lastValueFrom(
      this.client.send({ cmd: 'usuario_actualizar' }, { id, ...data }).pipe(
        catchError(err => {
          throw new HttpException(
            err?.response?.message || err.message || 'Error al actualizar usuario',
            HttpStatus.BAD_REQUEST,
          );
        }),
      ),
    );

    return {
      status: 'success',
      message: 'Usuario actualizado correctamente',
      data: result,
    };
  }

  // Eliminar un usuario por ID
  async eliminarUsuario(id: number) {
    await lastValueFrom(
      this.client.send({ cmd: 'usuario_eliminar' }, { id }).pipe(
        catchError(err => {
          throw new HttpException(
            err?.response?.message || err.message || 'Error al eliminar usuario',
            HttpStatus.BAD_REQUEST,
          );
        }),
      ),
    );

    return {
      status: 'success',
      message: 'Usuario eliminado correctamente',
    };
  }
}
