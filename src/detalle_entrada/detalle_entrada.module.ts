import { Module } from '@nestjs/common';
import { DetalleEntradaService } from './detalle_entrada.service';
import { DetalleEntradaController } from './detalle_entrada.controller';

@Module({
  controllers: [DetalleEntradaController],
  providers: [DetalleEntradaService],
})
export class DetalleEntradaModule {}
