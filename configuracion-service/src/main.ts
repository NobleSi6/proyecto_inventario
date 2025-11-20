// configuracion-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Configuración')
    .setDescription('Microservicio para gestión de estados y catálogos')
    .setVersion('1.0')
    .addTag('estados')
    .addServer(`http://localhost:${configService.get('PORT') || 3003}`, 'Desarrollo')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  const port = configService.get('PORT') || 3003;
  await app.listen(port);
  console.log(`Microservicio de Configuración corriendo en puerto ${port}`);
  console.log(`Documentación Swagger disponible en http://localhost:${port}/api/docs`);
}
bootstrap();