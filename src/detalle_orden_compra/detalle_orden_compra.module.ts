import { Module } from '@nestjs/common';
import { DetalleOrdenCompraService } from './detalle_orden_compra.service';
import { DetalleOrdenCompraController } from './detalle_orden_compra.controller';

@Module({
  controllers: [DetalleOrdenCompraController],
  providers: [DetalleOrdenCompraService],
})
export class DetalleOrdenCompraModule {}
