import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallesSalidaService } from './detalles-salida.service';
import { DetallesSalidaController } from './detalles-salida.controller';
import { DetalleSalida } from './detalle-salida.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleSalida])],
  controllers: [DetallesSalidaController],
  providers: [DetallesSalidaService],
  exports: [TypeOrmModule, DetallesSalidaService],
})
export class DetallesSalidaModule {}