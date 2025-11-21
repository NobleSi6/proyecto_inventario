import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, catchError } from 'rxjs';

@Injectable()
export class EmpleadosClientService {
  constructor(
    @Inject('USUARIOS_SERVICE') private readonly client: ClientProxy,
  ) {}

  // Listar empleados
  async listarEmpleados() {
    try {
      const result = await lastValueFrom(
        this.client.send({ cmd: 'empleado_listar' }, {}).pipe(
          catchError(err => {
            throw new HttpException(
              err?.response?.message || err.message || 'Error al listar empleados',
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
    } catch (error) {
      throw new HttpException(
        { status: 'error', message: error.message || 'Error al listar empleados' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Buscar un empleado por ID
  async buscarEmpleado(id: number) {
    try {
      const result = await lastValueFrom(
        this.client.send({ cmd: 'empleado_buscar' }, id).pipe(
          catchError(err => {
            throw new HttpException(
              err?.response?.message || err.message || 'Empleado no encontrado',
              HttpStatus.NOT_FOUND,
            );
          }),
        ),
      );
      return { status: 'success', data: result };
    } catch (error) {
      throw new HttpException(
        { status: 'error', message: error.message || 'Empleado no encontrado' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // Crear empleado
  async crearEmpleado(data: any) {
    try {
      const result = await lastValueFrom(
        this.client.send({ cmd: 'empleado_crear' }, data).pipe(
          catchError(err => {
            throw new HttpException(
              err?.response?.message || err.message || 'Error al crear empleado',
              HttpStatus.BAD_REQUEST,
            );
          }),
        ),
      );
      return { status: 'success', message: 'Empleado creado correctamente', data: result };
    } catch (error) {
      throw new HttpException(
        { status: 'error', message: error.message || 'Error al crear empleado' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Actualizar empleado
  async actualizarEmpleado(id: number, data: any) {
    try {
      const result = await lastValueFrom(
        this.client.send({ cmd: 'empleado_actualizar' }, { id, dto: data }).pipe(
          catchError(err => {
            throw new HttpException(
              err?.response?.message || err.message || 'Error al actualizar empleado',
              HttpStatus.BAD_REQUEST,
            );
          }),
        ),
      );
      return { status: 'success', message: 'Empleado actualizado correctamente', data: result };
    } catch (error) {
      throw new HttpException(
        { status: 'error', message: error.message || 'Error al actualizar empleado' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Eliminar empleado
  async eliminarEmpleado(id: number) {
    try {
      const result = await lastValueFrom(
        this.client.send({ cmd: 'empleado_eliminar' }, id).pipe(
          catchError(err => {
            throw new HttpException(
              err?.response?.message || err.message || 'Error al eliminar empleado',
              HttpStatus.BAD_REQUEST,
            );
          }),
        ),
      );
      return { status: 'success', message: 'Empleado eliminado correctamente', data: result };
    } catch (error) {
      throw new HttpException(
        { status: 'error', message: error.message || 'Error al eliminar empleado' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
