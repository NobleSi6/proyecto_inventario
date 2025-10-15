import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialInventarioController } from './historial-inventario.controller';
import { HistorialInventario } from './historial-inventario.entity'; // Debe coincidir con la entidad real
import { HistorialInventarioService } from './historial-inventario.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HistorialInventario]),
  ],
  controllers: [HistorialInventarioController],
  providers: [HistorialInventarioService],
})
export class HistorialInventarioModule {}