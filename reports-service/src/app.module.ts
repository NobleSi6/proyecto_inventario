// src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; 
// 💡 Importar el módulo del core que acabas de crear
import { ReportsModule  } from './reports/reports.module'; 

@Module({
  imports: [
    // Usamos esto para leer variables de entorno como PORT y BACKEND_CRUD_URL
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    // ✅ Agrega tu módulo aquí para que NestJS cargue el controlador
    ReportsModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}