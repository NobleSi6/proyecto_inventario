import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"; 
import { ValidationPipe } from '@nestjs/common'; // Importación recomendada

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Añadir el ValidationPipe a nivel global
  app.useGlobalPipes(new ValidationPipe({
      whitelist: true, // Ignora propiedades que no están definidas en los DTOs
      forbidNonWhitelisted: true, // Lanza error si se envían propiedades no deseadas
      transform: true, // Transforma los datos de la ruta/query a los tipos de los DTOs (ej: string a number)
  }));

  // --- COMIENZO DE LA CONFIGURACIÓN DE SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle('API de Gestión de Inventario para Constructora')
    .setDescription('Documentación de la API CRUD para la gestión de materiales, órdenes de compra, salidas, transferencias y stock.')
    .setVersion('1.0')
    .addTag('materiales', 'Gestión del catálogo maestro de materiales')
    .addTag('proyectos', 'Gestión de proyectos y obras')
    .addTag('roles', 'Gestión del catálogo de cargos de empleados')
    .addTag('ordenes-compra', 'Cabeceras de las órdenes de compra (Entradas)')
    .addTag('salidas', 'Cabeceras de las salidas de inventario (Egresos)')
    .addTag('transferencias', 'Cabeceras de los traspasos entre almacenes')
    .addTag('stock-almacen', 'Registros de existencia de materiales en almacenes')
    // Agregue aquí cualquier otra etiqueta (@ApiTags) que haya definido en sus controladores
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  
  // La interfaz de Swagger estará disponible en /api
  SwaggerModule.setup('api', app, document);
  // --- FIN DE LA CONFIGURACIÓN DE SWAGGER ---

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();