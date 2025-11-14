import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallesTransferenciaService } from './detalles-transferencia.service';
import { DetallesTransferenciaController } from './detalles-transferencia.controller';
import { DetalleTransferencia } from './detalle-transferencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleTransferencia])],
  controllers: [DetallesTransferenciaController],
  providers: [DetallesTransferenciaService],
  exports: [TypeOrmModule, DetallesTransferenciaService],
})
export class DetallesTransferenciaModule {}