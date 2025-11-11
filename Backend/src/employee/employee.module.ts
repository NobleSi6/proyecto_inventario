// src/employee/employee.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Employee } from './entities/employee.entity'; // Importa la Entidad

@Module({
  imports: [
    // 💡 Usa .forFeature() para registrar las entidades en un módulo específico
    TypeOrmModule.forFeature([Employee]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  // Opcional: exporta el servicio si otros módulos necesitan acceder a él
  // exports: [EmployeeService]
})
export class EmployeeModule {}