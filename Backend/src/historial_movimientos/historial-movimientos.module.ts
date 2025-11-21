import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialMovimientosService } from './historial-movimientos.service';
import { HistorialMovimientosController } from './historial-movimientos.controller';
import { HistorialMovimiento } from './historial-movimiento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistorialMovimiento])],
  controllers: [HistorialMovimientosController],
  providers: [HistorialMovimientosService],
  exports: [TypeOrmModule, HistorialMovimientosService],
})
export class HistorialMovimientosModule {}