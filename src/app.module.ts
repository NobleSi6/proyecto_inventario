// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//estan comentados para evitar errores si no existen los modulos
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { InventarioModule } from './inventario/inventario.module';

import { SalidasModule } from './salidas_inventario/salidas.module';
import { DetallesSalidaModule } from './detalle_salida/detalles-salida.module';

import { Salida } from './salidas_inventario/salida.entity';
import { DetalleSalida } from './detalle_salida/detalle-salida.entity'


@Module({
  imports: [
    // 1. Configuración de la conexión a la base de datos (Global)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // O el nombre de tu contenedor Docker si lo usas
      port: 5432,        // Puerto por defecto de PostgreSQL
      username: 'postgres', // ⚠️ CÁMBIALO
      password: '76507680', // ⚠️ CÁMBIALO
      database: 'testbackup', // El nombre de tu DB
      
      // Importante: lista todas tus entidades aquí
      entities: [Salida, DetalleSalida], // Agrega tus entidades aquí
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], "descomentar luego de las pruebas"
      
      synchronize: true, // ¡Solo usar en desarrollo! Esto crea las tablas automáticamente.
      autoLoadEntities: true, // Carga automáticamente las entidades
    }),
    
    //UsuariosModule,
    //AuthModule,
    //InventarioModule,

    SalidasModule,
    DetallesSalidaModule,

    // ... otros módulos
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}