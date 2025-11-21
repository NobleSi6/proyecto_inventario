import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Empleado } from './empleados.entity';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepo: Repository<Empleado>,
  ) {}

  async crear(dto: CreateEmpleadoDto) {
    try {
      const nuevo = this.empleadoRepo.create(dto);
      const guardado = await this.empleadoRepo.save(nuevo);
      return guardado;
    } catch (error) {
      console.error('Error al crear empleado:', error);
      throw new BadRequestException('Error al crear empleado: ' + error.message);
    }
  }

  async listar() {
    try {
      return await this.empleadoRepo.find();
    } catch (error) {
      console.error('Error al listar empleados:', error);
      throw new BadRequestException('Error al listar empleados');
    }
  }

  async buscarUno(id: number) {
    try {
      const empleado = await this.empleadoRepo.findOne({ where: { id_empleado: id } });
      if (!empleado) throw new NotFoundException('Empleado no encontrado');
      return empleado;
    } catch (error) {
      console.error('Error al buscar empleado:', error);
      throw new BadRequestException('Error al buscar empleado');
    }
  }

  async actualizar(id: number, dto: UpdateEmpleadoDto) {
    try {
      const empleado = await this.empleadoRepo.findOne({ where: { id_empleado: id } });
      if (!empleado) throw new NotFoundException('Empleado no encontrado');

      Object.assign(empleado, dto);
      return await this.empleadoRepo.save(empleado);
    } catch (error) {
      console.error('Error al actualizar empleado:', error);
      throw new BadRequestException('Error al actualizar empleado: ' + error.message);
    }
  }

  async eliminar(id: number) {
    try {
      const empleado = await this.empleadoRepo.findOne({ where: { id_empleado: id } });
      if (!empleado) throw new NotFoundException('Empleado no encontrado');

      await this.empleadoRepo.remove(empleado);
      return { message: 'Empleado eliminado correctamente' };
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
      throw new BadRequestException('Error al eliminar empleado: ' + error.message);
    }
  }
}
