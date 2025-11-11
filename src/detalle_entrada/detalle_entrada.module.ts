import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleEntradaService } from './detalle_entrada.service';
import { DetalleEntradaController } from './detalle_entrada.controller';
import { DetalleEntrada } from './entities/detalle_entrada.entity'; // Ajusta la ruta si es necesario

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleEntrada]), // ESTO ES LO QUE FALTA
  ],
  controllers: [DetalleEntradaController],
  providers: [DetalleEntradaService],
})
export class DetalleEntradaModule {}