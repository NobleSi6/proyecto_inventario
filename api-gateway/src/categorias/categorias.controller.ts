import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CategoriasClientService } from './categorias.service';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly msClient: CategoriasClientService) {}

  @Get()
  async listar() {
    try {
      const categorias = await this.msClient.listarCategorias();
      return { status: 'success', data: categorias };
    } catch (error: any) {
      throw new HttpException(
        { status: 'error', message: error?.message || 'Error al listar categorías' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async crear(@Body() payload: any) {
    try {
      const categoriaCreada = await this.msClient.crearCategoria(payload);
      return { status: 'success', data: categoriaCreada };
    } catch (error: any) {
      throw new HttpException(
        { status: 'error', message: error?.message || 'Error al crear categoría' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
