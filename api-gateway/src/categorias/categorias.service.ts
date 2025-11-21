import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, catchError } from 'rxjs';

@Injectable()
export class CategoriasClientService {
  constructor(
    @Inject('MATERIALES_SERVICE') private readonly client: ClientProxy,
  ) {}

  // Listar categorías
  async listarCategorias() {
    try {
      const result = await lastValueFrom(
        this.client.send({ cmd: 'categoria_listar' }, {}).pipe(
          catchError(err => {
            throw new HttpException(
              err?.response?.message || err.message || 'Error al listar categorías',
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
        { status: 'error', message: error.message || 'Error al listar categorías' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Crear categoría
  async crearCategoria(data: any) {
    try {
      const result = await lastValueFrom(
        this.client.send({ cmd: 'categoria_crear' }, data).pipe(
          catchError(err => {
            throw new HttpException(
              err?.response?.message || err.message || 'Error al crear categoría',
              HttpStatus.BAD_REQUEST,
            );
          }),
        ),
      );

      return {
        status: 'success',
        message: 'Categoría creada correctamente',
        data: result,
      };

    } catch (error) {
      throw new HttpException(
        { status: 'error', message: error.message || 'Error al crear categoría' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
