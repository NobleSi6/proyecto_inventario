import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { MaterialesClientService } from './materiales.service';

@Controller('materiales')
export class MaterialesController {
  constructor(private readonly msClient: MaterialesClientService) {}

  @Get()
  async listar() {
    try {
      const materiales = await this.msClient.listarMateriales();
      return { status: 'success', data: materiales };
    } catch (error: any) {
      throw new HttpException(
        { status: 'error', message: error?.message || 'Error al listar materiales' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async obtener(@Param('id') id: string) {
    try {
      const material = await this.msClient.obtenerMaterial(Number(id));
      return { status: 'success', data: material };
    } catch (error: any) {
      throw new HttpException(
        { status: 'error', message: error?.message || `Error al obtener material id=${id}` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  async crear(@Body() payload: any) {
    try {
      const materialCreado = await this.msClient.crearMaterial(payload);
      return { status: 'success', data: materialCreado };
    } catch (error: any) {
      throw new HttpException(
        { status: 'error', message: error?.message || 'Error al crear material' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  async actualizar(@Param('id') id: string, @Body() cambios: any) {
    try {
      const materialActualizado = await this.msClient.actualizarMaterial(Number(id), cambios);
      return { status: 'success', data: materialActualizado };
    } catch (error: any) {
      throw new HttpException(
        { status: 'error', message: error?.message || `Error al actualizar material id=${id}` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    try {
      const materialEliminado = await this.msClient.eliminarMaterial(Number(id));
      return { status: 'success', data: materialEliminado };
    } catch (error: any) {
      throw new HttpException(
        { status: 'error', message: error?.message || `Error al eliminar material id=${id}` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
