// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'; // 1. Importar dotenv

dotenv.config(); // 2. Cargar las variables de entorno desde el .env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 3. Leer el puerto directamente de process.env, usando 3002 como valor por defecto
  const port = process.env.PORT || 3002; 
  
  await app.listen(port);
  
  console.log(`🚀 Microservicio Core corriendo en: http://localhost:${port}`);
}
bootstrap();
//pa hacer commit