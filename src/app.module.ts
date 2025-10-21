// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { InventarioModule } from './inventario/inventario.module';
import { EmployeeModule } from './employee/employee.module';
import { ProjectsModule } from './projects/projects.module';

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
      
      synchronize: false, // ¡Solo usar en desarrollo! Esto crea las tablas automáticamente.
      autoLoadEntities: true, // Carga automáticamente las entidades
    }),
    
    UsuariosModule,
    AuthModule,
    InventarioModule,
    EmployeeModule,
    ProjectsModule,
    // ... otros módulos
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}