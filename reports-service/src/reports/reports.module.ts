// src/reports/reports.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { DetalleSalida } from './entities/DetalleSalida.entity'; // <- NUEVO
import { Material } from './entities/Material.entity'; // <- NUEVO
import { Salida } from './entities/SalidasInventario.entity'; // <- POSIBLEMENTE NECESARIO para los filtros de proyecto/fecha

@Module({
    // Inyectamos las entidades que vamos a usar
    imports: [TypeOrmModule.forFeature([DetalleSalida, Material, Salida])], 
    controllers: [ReportsController],
    providers: [ReportsService],
})
export class ReportsModule {}