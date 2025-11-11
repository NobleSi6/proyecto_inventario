import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferenciasService } from './transferencias.service';
import { TransferenciasController } from './transferencias.controller';
import { Transferencia } from './transferencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transferencia])],
  controllers: [TransferenciasController],
  providers: [TransferenciasService],
  exports: [TypeOrmModule, TransferenciasService],
})
export class TransferenciasModule {}