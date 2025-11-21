// src/reports/reports.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { DetalleSalida } from './entities/DetalleSalida.entity'; // <- NUEVO
import { Material } from './entities/Material.entity'; // <- NUEVO
import { Salida } from './entities/SalidasInventario.entity'; // <- POSIBLEMENTE NECESARIO para los filtros de proyecto/fecha

import { ConfigModule, ConfigService } from '@nestjs/config'; // Importar ConfigModule y ConfigService
import { HttpModule } from '@nestjs/axios';

@Module({
//     // Inyectamos las entidades que vamos a usar
//     imports: [TypeOrmModule.forFeature([DetalleSalida, Material, Salida])], 
//     controllers: [ReportsController],
//     providers: [ReportsService],
// })


 imports: [
    // 1. Configura para leer variables de entorno
    ConfigModule.forRoot({
        isGlobal: true, // Para que esté disponible en toda la app
    }),
    
    // 2. Registra el HttpModule de forma asíncrona para usar ConfigService
    HttpModule.registerAsync({
      imports: [ConfigModule], // Importa ConfigModule para inyectar ConfigService
      useFactory: async (configService: ConfigService) => ({
        // Usa la variable de entorno
        baseURL: configService.get<string>('BACKEND_CRUD_URL'), 
        timeout: 5000,
      }),
      inject: [ConfigService], // Inyecta el servicio de configuración
    }),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}