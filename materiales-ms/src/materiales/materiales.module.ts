import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialesService } from './materiales.service';
import { MaterialesController } from './materiales.controller';
import { Material } from './entities/material.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { UnidadMedida } from 'src/unidades_medida/entities/unidad_medida.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Material, Categoria, UnidadMedida])],
  providers: [MaterialesService],
  controllers: [MaterialesController],
  exports: [MaterialesService],
})
export class MaterialesModule {}
