import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, catchError } from 'rxjs';

@Injectable()
export class MaterialesClientService {
  constructor(
    @Inject('MATERIALES_SERVICE') private readonly client: ClientProxy,
  ) {}

  // Listar materiales
  async listarMateriales() {
    try {
      const result = await lastValueFrom(
        this.client.send({ cmd: 'material_listar' }, {}).pipe(
          catchError(err => {
            throw new HttpException(
              err?.response?.message || err.message || 'Error al listar materiales',
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
        { status: 'error', message: error.message || 'Error al listar materiales' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Obtener un material por ID
  async obtenerMaterial(id: number) {
    try {
      const result = await lastValueFrom(
        this.client.send({ cmd: 'material_buscar' }, id).pipe(
          catchError(err => {
            throw new HttpException(
              err?.response?.message || err.message || 'Material no encontrado',
              HttpStatus.NOT_FOUND,
            );
          }),
        ),
      );

      return { status: 'success', data: result };
    } catch (error) {
      throw new HttpException(
        { status: 'error', message: error.message || 'Material no encontrado' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // Crear material
  async crearMaterial(data: any) {
    try {
      const result = await lastValueFrom(
        this.client.send({ cmd: 'material_crear' }, data).pipe(
          catchError(err => {
            throw new HttpException(
              err?.response?.message || err.message || 'Error al crear material',
              HttpStatus.BAD_REQUEST,
            );
          }),
        ),
      );

      return {
        status: 'success',
        message: 'Material creado correctamente',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: error.message || 'Error al crear material',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Actualizar material
  async actualizarMaterial(id: number, data: any) {
    try {
      const result = await lastValueFrom(
        this.client.send(
          { cmd: 'material_actualizar' },
          { id, dto: data },
        ).pipe(
          catchError(err => {
            throw new HttpException(
              err?.response?.message || err.message || 'Error al actualizar material',
              HttpStatus.BAD_REQUEST,
            );
          }),
        ),
      );

      return {
        status: 'success',
        message: 'Material actualizado correctamente',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: error.message || 'Error al actualizar material',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Eliminar material
  async eliminarMaterial(id: number) {
    try {
      const result = await lastValueFrom(
        this.client.send({ cmd: 'material_eliminar' }, id).pipe(
          catchError(err => {
            throw new HttpException(
              err?.response?.message || err.message || 'Error al eliminar material',
              HttpStatus.BAD_REQUEST,
            );
          }),
        ),
      );

      return {
        status: 'success',
        message: 'Material eliminado correctamente',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: error.message || 'Error al eliminar material',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
