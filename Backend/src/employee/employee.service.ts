// src/employee/employee.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto'; 

import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  // POST: Crear un nuevo empleado
  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const newEmployee = this.employeeRepository.create(createEmployeeDto);
    return this.employeeRepository.save(newEmployee);
  }

  // GET: Obtener todos los empleados
  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  // ------------------------------------
  // ✅ MÉTODO findOne CORREGIDO
  // ------------------------------------
  async findOne(id: number): Promise<Employee> {
    // CORRECCIÓN CLAVE: El nombre de la columna en la entidad es 'idEmpleado', 
    // por lo tanto, usamos { idEmpleado: id } para buscar.
    const employee = await this.employeeRepository.findOneBy({ idEmpleado: id }); 

    if (!employee) {
      throw new NotFoundException(`Empleado con ID ${id} no encontrado.`);
    }

    return employee;
  }
  // ------------------------------------

  // ------------------------------------
  // PATCH/Actualizar
  // ------------------------------------
  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    // 1. Busca si el empleado existe. Si no existe, lanza una excepción.
    // Reutilizamos findOne (que usa el ID correcto 'idEmpleado')
    const employee = await this.findOne(id); 

    // 2. Combina (merge) los datos del DTO con la entidad existente.
    this.employeeRepository.merge(employee, updateEmployeeDto);

    // 3. Guarda la entidad actualizada.
    return this.employeeRepository.save(employee);
  }
  // ------------------------------------

  // DELETE: Eliminar un empleado
  async remove(id: number): Promise<void> {
    // CORRECCIÓN CLAVE: Al usar delete con el ID primario, TypeORM necesita
    // saber cuál es esa columna (idEmpleado).
    const result = await this.employeeRepository.delete({ idEmpleado: id });
    if (result.affected === 0) {
      throw new NotFoundException(`Empleado con ID ${id} no encontrado.`);
    }
  }
}