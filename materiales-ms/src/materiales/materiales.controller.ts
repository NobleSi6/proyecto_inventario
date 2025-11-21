import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MaterialesService } from './materiales.service';
import { CrearMaterialDto } from './dto/create-material.dto';
import { ActualizarMaterialDto } from './dto/update-material.dto';

@Controller()
export class MaterialesController {
  constructor(private readonly servicio: MaterialesService) {}

  // 📌 Listar materiales
  @MessagePattern({ cmd: 'material_listar' })
  listar() {
    return this.servicio.listar();
  }

  // 📌 Obtener material por ID
  @MessagePattern({ cmd: 'material_obtener' })
  obtener(@Payload() data: { id: number }) {
    return this.servicio.obtenerPorId(data.id);
  }

  // 📌 Crear material
  @MessagePattern({ cmd: 'material_crear' })
  crear(@Payload() payload: CrearMaterialDto) {
    return this.servicio.crear(payload);
  }

  // 📌 Actualizar material
  @MessagePattern({ cmd: 'material_actualizar' })
  actualizar(@Payload() data: { id: number; cambios: ActualizarMaterialDto }) {
    return this.servicio.actualizar(data.id, data.cambios);
  }

  // 📌 Eliminar material
  @MessagePattern({ cmd: 'material_eliminar' })
  eliminar(@Payload() data: { id: number }) {
    return this.servicio.eliminar(data.id);
  }
}
