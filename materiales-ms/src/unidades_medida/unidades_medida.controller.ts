import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UnidadesMedidaService } from './unidades_medida.service';
import { CreateUnidadMedidaDto } from './dto/create-unidad-medida.dto';
import { UpdateUnidadMedidaDto } from './dto/update-unidad-medida.dto';

@Controller()
export class UnidadesMedidaController {
  constructor(private readonly servicio: UnidadesMedidaService) {}

  @MessagePattern({ cmd: 'unidad_listar' })
  listar() {
    return this.servicio.findAll();
  }

  @MessagePattern({ cmd: 'unidad_obtener' })
  obtener(payload: { id: number }) {
    return this.servicio.findOne(payload.id);
  }

  @MessagePattern({ cmd: 'unidad_crear' })
  crear(payload: CreateUnidadMedidaDto) {
    return this.servicio.create(payload);
  }

  @MessagePattern({ cmd: 'unidad_actualizar' })
  actualizar(payload: { id: number; cambios: UpdateUnidadMedidaDto }) {
    return this.servicio.update(payload.id, payload.cambios);
  }

  @MessagePattern({ cmd: 'unidad_eliminar' })
  eliminar(payload: { id: number }) {
    return this.servicio.remove(payload.id);
  }
}
