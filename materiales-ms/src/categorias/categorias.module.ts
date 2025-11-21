import { Module } from '@nestjs/common';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { MaterialesService } from 'src/materiales/materiales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from 'src/materiales/entities/material.entity';
import { Categoria } from './entities/categoria.entity';
import { UnidadMedida } from 'src/unidades_medida/entities/unidad_medida.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Material, Categoria, UnidadMedida])],
  controllers: [CategoriasController],
  providers: [CategoriasService],
  exports: [CategoriasService]
})
export class CategoriasModule {}
