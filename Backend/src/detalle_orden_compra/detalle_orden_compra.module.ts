import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleOrdenCompraService } from './detalle_orden_compra.service';
import { DetalleOrdenCompraController } from './detalle_orden_compra.controller';
import { DetalleOrdenCompra } from './entities/detalle_orden_compra.entity'; // Ajusta la ruta si es necesario

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleOrdenCompra]), // ESTO ES LO QUE FALTA
  ],
  controllers: [DetalleOrdenCompraController],
  providers: [DetalleOrdenCompraService],
})
export class DetalleOrdenCompraModule {}