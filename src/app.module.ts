// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { InventarioModule } from './inventario/inventario.module';

@Module({
  imports: [
    // 1. Configuración de la conexión a la base de datos (Global)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // O el nombre de tu contenedor Docker si lo usas
      port: 5432,        // Puerto por defecto de PostgreSQL
      username: 'postgres', // ⚠️ CÁMBIALO
      password: '123456789', // ⚠️ CÁMBIALO
      database: 'TestBackup', // El nombre de tu DB
      
      // Importante: lista todas tus entidades aquí
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      
      synchronize: true, // ¡Solo usar en desarrollo! Esto crea las tablas automáticamente.
      autoLoadEntities: true, // Carga automáticamente las entidades
    }),
    
    UsuariosModule,
    AuthModule,
    InventarioModule,
    // ... otros módulos
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}