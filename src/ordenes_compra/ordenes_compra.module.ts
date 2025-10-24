import { Module } from '@nestjs/common';
import { OrdenesCompraService } from './ordenes_compra.service';
import { OrdenesCompraController } from './ordenes_compra.controller';

@Module({
  controllers: [OrdenesCompraController],
  providers: [OrdenesCompraService],
})
export class OrdenesCompraModule {}
