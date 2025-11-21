// api-gateway/src/main.ts
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  app.enableCors();

  // Configuración de Swagger para el Gateway
  const config = new DocumentBuilder()
    .setTitle('API Gateway - Sistema de Inventario')
    .setDescription('Gateway centralizado para todos los microservicios del sistema de inventario')
    .setVersion('1.0')
    .addServer(`http://localhost:${configService.get('PORT') || 4000}`, 'Gateway')
    .addServer('http://localhost:3000', 'Backend Monolítico')
    .addServer('http://localhost:3001', 'Microservicio de Reportes')
    .addServer('http://localhost:3002', 'Microservicio de Proyectos')
    .addServer('http://localhost:3003', 'Microservicio de Configuración')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  const port = configService.get('PORT') || 4000;
  await app.listen(port);
  console.log(`API Gateway corriendo en puerto ${port}`);
  console.log(`Documentación Swagger disponible en http://localhost:${port}/api/docs`);
  console.log(`\nRutas disponibles:`);
  console.log(`- Backend: http://localhost:${port}/*`);
  console.log(`- Proyectos: http://localhost:${port}/proyectos`);
  console.log(`- Estados: http://localhost:${port}/estados`);
  console.log(`- Reportes: http://localhost:${port}/reportes`);
}
bootstrap();
