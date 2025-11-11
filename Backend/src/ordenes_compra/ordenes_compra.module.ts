import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenesCompraService } from './ordenes_compra.service';
import { OrdenesCompraController } from './ordenes_compra.controller';
import { OrdenCompra } from './entities/ordenes_compra.entity'; // Ajusta la ruta si es necesario

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdenCompra]), // ESTO ES LO QUE FALTA
  ],
  controllers: [OrdenesCompraController],
  providers: [OrdenesCompraService],
})
export class OrdenesCompraModule {}