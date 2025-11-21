import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: Number(process.env.TCP_PORT || 4001),
    },
  });

  await app.listen();
  console.log('Microservicio Materiales escuchando en TCP puerto', process.env.TCP_PORT || 4001);
}
bootstrap();
