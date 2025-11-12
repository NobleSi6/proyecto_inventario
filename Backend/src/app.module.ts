// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//estan comentados para evitar errores si no existen los modulos
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
//import { InventarioModule } from './inventario/inventario.module';
//salidas y detalle salidas
import { SalidasModule } from './salidas_inventario/salidas.module';
import { DetallesSalidaModule } from './detalle_salida/detalles-salida.module';

// import { Salida } from './salidas_inventario/salida.entity';
// import { DetalleSalida } from './detalle_salida/detalle-salida.entity'
// import { trace } from 'console';

//transferencias y detalle transferencias

import { TransferenciasModule } from './transferencias/transferencias.module';
// import { Transferencia } from './transferencias/transferencia.entity';
// import { DetalleTransferencia } from './detalle_transferencia/detalle-transferencia.entity';
import { DetallesTransferenciaModule } from './detalle_transferencia/detalles-transferencia.module';

//Materiales

//import { Material } from './materiales/material.entity';
import { MaterialesModule } from './materiales/materiales.module';

//Almacenes

//import { Almacen } from './almacenes/almacen.entity';
import { AlmacenesModule } from './almacenes/almacenes.module';

//stock_almacen

//import { StockAlmacen } from './stock_almacen/stock-almacen.entity';
import { StockAlmacenModule } from './stock_almacen/stock-almacen.module';

//historial movimientos

//import { HistorialMovimiento } from './historial_movimientos/historial-movimiento.entity';
import { HistorialMovimientosModule } from './historial_movimientos/historial-movimientos.module';

import { EmployeeModule } from './employee/employee.module';
import { ProjectsModule } from './projects/projects.module';
import { EntradasInventarioModule } from './entradas_inventario/entradas_inventario.module';
import { DetalleEntradaModule } from './detalle_entrada/detalle_entrada.module';
import { OrdenesCompraModule } from './ordenes_compra/ordenes_compra.module';
import { DetalleOrdenCompraModule } from './detalle_orden_compra/detalle_orden_compra.module';
import { RolesModule } from './roles/roles.module';
//para el .env

import { ConfigModule, ConfigService} from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigModule esté disponible en toda la aplicación
    }),
    // 1. Configuración de la conexión a la base de datos (Global)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
      // type: 'postgres',
      // host: 'localhost', // O el nombre de tu contenedor Docker si lo usas
      // port: 5432,        // Puerto por defecto de PostgreSQL
      // username: 'postgres', // ⚠️ CÁMBIALO
      // password: '76507680', // ⚠️ CÁMBIALO
      // database: 'testbackup', // El nombre de tu DB

      type: configService.get<string>('DB_TYPE') as 'postgres', // Usa 'postgres' como tipo forzado
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'), // Asegúrate de que el .env tenga un valor numérico o conviértelo
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
      
      // Importante: lista todas tus entidades aquí
      //entities: [Salida, DetalleSalida,Transferencia,DetalleTransferencia,Material,Almacen,StockAlmacen,HistorialMovimiento], // Agrega tus entidades aquí
      entities: [__dirname + '/**/*.entity{.ts,.js}'], //"descomentar luego de las pruebas"
      
      synchronize: false, // ¡Solo usar en desarrollo! Esto crea las tablas automáticamente.
      autoLoadEntities: true, // Carga automáticamente las entidades
    }),
    inject: [ConfigService],
    }),
    // 2. Importa tus módulos aquí
    //InventarioModule,
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
    EmployeeModule,
    ProjectsModule,
    EntradasInventarioModule,
    DetalleEntradaModule,
    OrdenesCompraModule,
    DetalleOrdenCompraModule,
    RolesModule,
    // ... otros módulos
  ],
  providers: [],
})
export class AppModule {}