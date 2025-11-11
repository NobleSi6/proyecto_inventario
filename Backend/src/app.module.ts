import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Importación de Módulos
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { InventarioModule } from './inventario/inventario.module'; // <--- Módulo añadido
import { SalidasModule } from './salidas_inventario/salidas.module';
import { DetallesSalidaModule } from './detalle_salida/detalles-salida.module';
import { TransferenciasModule } from './transferencias/transferencias.module';
import { DetallesTransferenciaModule } from './detalle_transferencia/detalles-transferencia.module';
import { MaterialesModule } from './materiales/materiales.module';
import { AlmacenesModule } from './almacenes/almacenes.module';
import { StockAlmacenModule } from './stock_almacen/stock-almacen.module';
import { HistorialMovimientosModule } from './historial_movimientos/historial-movimientos.module';
import { EmployeeModule } from './employee/employee.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    // Configura ConfigModule para cargar variables de entorno
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigModule esté disponible en toda la aplicación
    }),

    // Configuración de la conexión a la base de datos (Global)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // Obtenemos el valor de DB_TYPE y DB_PORT
        const dbType = configService.get<string>('DB_TYPE');
        const dbPort = configService.get<string>('DB_PORT');

        if (!dbType) {
          throw new Error('La variable de entorno DB_TYPE no está definida en el archivo .env.');
        }
        
        // CRÍTICO: Verificar que dbPort también esté definido antes de usar parseInt
        if (!dbPort) {
          throw new Error('La variable de entorno DB_PORT no está definida en el archivo .env.');
        }

        // Se usa 'as any' porque el tipo literal de TypeORM
        // (ej: 'postgres') es más estricto que el 'string' genérico de ConfigService.
        return {
          type: dbType as any, 
          host: configService.get<string>('DB_HOST'),
          port: parseInt(dbPort, 10), // Convertir el puerto a número
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),

          // Usar glob para cargar todas las entidades. 
          // Asegúrate de que tus archivos de entidad terminen en .entity.ts o .entity.js
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          
          synchronize: configService.get<string>('NODE_ENV') !== 'production', // ¡Mejor usar solo en desarrollo!
          autoLoadEntities: true, 
        };
      },
    }),
    
    // Importación de Módulos
    SalidasModule,
    DetallesSalidaModule,
    TransferenciasModule,
    DetallesTransferenciaModule,
    MaterialesModule,
    AlmacenesModule,
    StockAlmacenModule,
    HistorialMovimientosModule,
    UsuariosModule,
    AuthModule,
    InventarioModule, // <--- Módulo añadido
    EmployeeModule,
    ProjectsModule,
  ],
  providers: [],
})
export class AppModule {}
