import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsuariosModule } from './usuarios/usuarios.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

import { Usuario } from './usuarios/usuarios.entity';
import { Rol } from './roles/roles.entity';
import { EmpleadosModule } from './empleados/empleados.module';
import { Empleado } from './empleados/empleados.entity';

@Module({
  imports: [
    // Configuración global de variables de entorno
    ConfigModule.forRoot({ isGlobal: true }),

    // Conexión a la base de datos
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT') || '5432', 10),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [Usuario, Rol, Empleado], // <-- Registramos todas las entidades explícitamente
        synchronize: false,        // Solo para desarrollo; en producción false
        logging: true,
      }),
    }),

    // Módulos de la aplicación
    forwardRef(() => RolesModule),
    forwardRef(() => UsuariosModule),
    forwardRef(() => AuthModule),
    forwardRef(() => EmpleadosModule),
  ],
})
export class AppModule {}
