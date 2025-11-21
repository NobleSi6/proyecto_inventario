import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    cors: true, // Habilita CORS para todos los orígenes (puedes personalizarlo)
  });

  // Pipes globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,      // Remueve propiedades no permitidas
      transform: true,      // Convierte tipos automáticamente
      forbidNonWhitelisted: false, // No lanza error si envían propiedades extras
    }),
  );

  // Prefijo global opcional (recomendado)
  app.setGlobalPrefix('api');

  // Soporte para apagado seguro (microservicios / Docker / PM2)
  app.enableShutdownHooks();

  const port = Number(process.env.PORT) || 3000;

  await app.listen(port);

  logger.log(`🚀 API Gateway ejecutándose en el puerto ${port}`);
  logger.log(`📡 Endpoints disponibles en http://localhost:${port}/api`);
}

bootstrap();
