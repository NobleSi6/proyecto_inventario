import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialesModule } from './materiales/materiales.module';
import { CategoriasModule } from './categorias/categorias.module';
import { Material } from './materiales/entities/material.entity';
import { Categoria } from './categorias/entities/categoria.entity';
import { UnidadMedida } from './unidades_medida/entities/unidad_medida.entity';
import { UnidadesMedidaModule } from './unidades_medida/unidades_medida.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        type: 'postgres',
        host: cs.get('DB_HOST'),
        port: Number(cs.get('DB_PORT')),
        username: cs.get('DB_USERNAME'),
        password: cs.get('DB_PASSWORD'),
        database: cs.get('DB_DATABASE'),
        entities: [Material, Categoria, UnidadMedida],
        synchronize: true, // SOLO en dev; en producción usa migraciones
        logging: false,
      }),
    }),
    MaterialesModule,
    CategoriasModule,
    UnidadesMedidaModule,
  ],
})
export class AppModule {}
