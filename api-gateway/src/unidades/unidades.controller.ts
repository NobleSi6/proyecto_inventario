import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UnidadesClientService } from './unidades.service';

@Controller('unidades')
export class UnidadesController {
  constructor(private readonly msClient: UnidadesClientService) {}

  @Get()
  async listar() {
    try {
      const unidades = await this.msClient.listarUnidades();
      return { status: 'success', data: unidades };
    } catch (error: any) {
      throw new HttpException(
        { status: 'error', message: error?.message || 'Error al listar unidades' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async crear(@Body() payload: any) {
    try {
      const unidadCreada = await this.msClient.crearUnidad(payload);
      return { status: 'success', data: unidadCreada };
    } catch (error: any) {
      throw new HttpException(
        { status: 'error', message: error?.message || 'Error al crear unidad' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
