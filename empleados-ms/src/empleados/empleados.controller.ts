import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmpleadosService } from './empleados.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';

@Controller()
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) {}

  /**
   * CREAR EMPLEADO
   * El API Gateway envía:
   * this.client.send({ cmd: 'empleado_crear' }, { dto: CreateEmpleadoDto })
   */
  @MessagePattern({ cmd: 'empleado_crear' })
  async crear(@Payload() payload: { dto: CreateEmpleadoDto }) {
    try {
      return await this.empleadosService.crear(payload.dto);
    } catch (error) {
      return { ok: false, message: 'Error al crear empleado', data: error.message };
    }
  }

  /**
   * LISTAR EMPLEADOS
   */
  @MessagePattern({ cmd: 'empleado_listar' })
  async listar() {
    try {
      return await this.empleadosService.listar();
    } catch (error) {
      return { ok: false, message: 'Error al listar empleados', data: error.message };
    }
  }

  /**
   * BUSCAR EMPLEADO POR ID
   * El API Gateway envía:
   * this.client.send({ cmd: 'empleado_buscar' }, { id })
   */
  @MessagePattern({ cmd: 'empleado_buscar' })
  async buscar(@Payload() payload: { id: number }) {
    try {
      return await this.empleadosService.buscarUno(Number(payload.id));
    } catch (error) {
      return { ok: false, message: 'Error al buscar empleado', data: error.message };
    }
  }

  /**
   * ACTUALIZAR EMPLEADO
   * El API Gateway envía:
   * this.client.send({ cmd: 'empleado_actualizar' }, { id, dto: UpdateEmpleadoDto })
   */
  @MessagePattern({ cmd: 'empleado_actualizar' })
  async actualizar(@Payload() payload: { id: number; dto: UpdateEmpleadoDto }) {
    try {
      return await this.empleadosService.actualizar(Number(payload.id), payload.dto);
    } catch (error) {
      return { ok: false, message: 'Error al actualizar empleado', data: error.message };
    }
  }

  /**
   * ELIMINAR EMPLEADO
   * El API Gateway envía:
   * this.client.send({ cmd: 'empleado_eliminar' }, { id })
   */
  @MessagePattern({ cmd: 'empleado_eliminar' })
  async eliminar(@Payload() payload: { id: number }) {
    try {
      return await this.empleadosService.eliminar(Number(payload.id));
    } catch (error) {
      return { ok: false, message: 'Error al eliminar empleado', data: error.message };
    }
  }
}
