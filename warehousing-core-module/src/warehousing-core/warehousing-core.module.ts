// src/warehousing-core/warehousing-core.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importar ConfigModule y ConfigService
import { WarehousingCoreService } from './warehousing-core.service';
import { WarehousingCoreController } from './warehousing-core.controller';

@Module({
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
  controllers: [WarehousingCoreController],
  providers: [WarehousingCoreService],
})
export class WarehousingCoreModule {}