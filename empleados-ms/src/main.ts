import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config(); // Carga variables de entorno desde .env

async function bootstrap() {
  const port = parseInt(process.env.TCP_PORT || '5000', 10);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: { port },
  });

  await app.listen();
  console.log(`✅ Microservicio de usuarios escuchando en TCP puerto ${port}`);
}

bootstrap();
