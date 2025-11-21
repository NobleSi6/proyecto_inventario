import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller()
export class CategoriasController {
  constructor(private readonly servicio: CategoriasService) {}

  // LISTAR
  @MessagePattern({ cmd: 'categoria_listar' })
  listar() {
    return this.servicio.listar();
  }

  // OBTENER POR ID
  @MessagePattern({ cmd: 'categoria_obtener' })
  obtener(payload: { id: number }) {
    return this.servicio.obtenerPorId(payload.id);
  }

  // CREAR
  @MessagePattern({ cmd: 'categoria_crear' })
  crear(payload: CreateCategoriaDto) {
    return this.servicio.crear(payload);
  }

  // ACTUALIZAR
  @MessagePattern({ cmd: 'categoria_actualizar' })
  actualizar(payload: { id: number; cambios: UpdateCategoriaDto }) {
    return this.servicio.actualizar(payload.id, payload.cambios);
  }

  // ELIMINAR
  @MessagePattern({ cmd: 'categoria_eliminar' })
  eliminar(payload: { id: number }) {
    return this.servicio.eliminar(payload.id);
  }
}
