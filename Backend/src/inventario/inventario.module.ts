// src/inventario/inventario.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventarioController } from './inventario.controller';
import { InventarioService } from './inventario.service';
import { ItemInventario } from './item-inventario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemInventario]),
  ],
  controllers: [InventarioController],
  providers: [InventarioService],
})
export class InventarioModule {}