import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';

// Controladores
import { MaterialesController } from './materiales/materiales.controller';
import { CategoriasController } from './categorias/categorias.controller';
import { UnidadesController } from './unidades/unidades.controller';
import { UsuariosController } from './usuarios/usuarios.controller';
import { RolesController } from './roles/roles.controller';
import { EmpleadosController } from './empleados/empleados.controller';

// Servicios
import { MaterialesClientService } from './materiales/materiales.service';
import { CategoriasClientService } from './categorias/categorias.service';
import { UnidadesClientService } from './unidades/unidades.service';
import { UsuariosClientService } from './usuarios/usuarios.service';
import { EmpleadosClientService } from './empleados/empleados.service';
import { RolesService } from './roles/roles.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,

    // Clientes TCP para microservicios
    ClientsModule.register([
      {
        name: 'USUARIOS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 5000, // Microservicio Usuarios / Empleados / Roles
        },
      },
      {
        name: 'MATERIALES_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4001, // Microservicio Materiales / Categorías / Unidades
        },
      },
    ]),
  ],

  controllers: [
    MaterialesController,
    CategoriasController,
    UnidadesController,
    UsuariosController,
    EmpleadosController,
    RolesController,
  ],

  providers: [
    MaterialesClientService,
    CategoriasClientService,
    UnidadesClientService,
    UsuariosClientService,
    EmpleadosClientService,
    RolesService,
  ],

  exports: [
    MaterialesClientService,
    CategoriasClientService,
    UnidadesClientService,
    UsuariosClientService,
    EmpleadosClientService,
    RolesService,
  ],
})
export class AppModule {}
