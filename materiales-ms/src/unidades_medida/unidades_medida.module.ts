import { Module } from '@nestjs/common';
import { UnidadesMedidaController } from './unidades_medida.controller';
import { UnidadesMedidaService } from './unidades_medida.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from 'src/materiales/entities/material.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { UnidadMedida } from './entities/unidad_medida.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Material, Categoria, UnidadMedida])],
  controllers: [UnidadesMedidaController],
  providers: [UnidadesMedidaService],
  exports: [UnidadesMedidaService]
})
export class UnidadesMedidaModule {}
