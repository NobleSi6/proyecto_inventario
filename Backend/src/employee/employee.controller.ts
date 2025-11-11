// src/employee/employee.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
// Necesitas este DTO para el método PATCH/UPDATE
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('empleados') // Ruta base: /empleados
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post() // POST /empleados
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get() // GET /empleados
  findAll() {
    return this.employeeService.findAll();
  }

// --- Nuevo método: GET por ID ---
  @Get(':id') // GET /empleados/:id
  findOne(@Param('id') id: string) {
    // Se utiliza el operador `+` para convertir el string 'id' a número
    return this.employeeService.findOne(+id); 
  }
// ---------------------------------

// --- Nuevo método: PATCH/Actualizar ---
  @Patch(':id') // PATCH /empleados/:id
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    // Se utiliza el operador `+` para convertir el string 'id' a número
    return this.employeeService.update(+id, updateEmployeeDto);
  }
// -------------------------------------

  @Delete(':id') // DELETE /empleados/:id
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}