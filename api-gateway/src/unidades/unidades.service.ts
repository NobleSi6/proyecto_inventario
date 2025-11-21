import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, catchError } from 'rxjs';

@Injectable()
export class UnidadesClientService {
  constructor(
    @Inject('MATERIALES_SERVICE') private readonly client: ClientProxy,
  ) {}

  // Listar unidades
  async listarUnidades() {
    try {
      const result = await lastValueFrom(
        this.client.send({ cmd: 'unidad_listar' }, {}).pipe(
          catchError(err => {
            throw new HttpException(
              err?.response?.message || err.message || 'Error al listar unidades',
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
        { status: 'error', message: error.message || 'Error al listar unidades' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Crear unidad
  async crearUnidad(data: any) {
    try {
      const result = await lastValueFrom(
        this.client.send({ cmd: 'unidad_crear' }, data).pipe(
          catchError(err => {
            throw new HttpException(
              err?.response?.message || err.message || 'Error al crear unidad',
              HttpStatus.BAD_REQUEST,
            );
          }),
        ),
      );

      return {
        status: 'success',
        message: 'Unidad creada correctamente',
        data: result,
      };

    } catch (error) {
      throw new HttpException(
        { status: 'error', message: error.message || 'Error al crear unidad' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
