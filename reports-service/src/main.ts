import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv'; // 1. Importar dotenv
dotenv.config(); // 2. Cargar las variables de entorno desde el .env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Microservicio Core corriendo en: http://localhost:${port}`);
}
bootstrap();
