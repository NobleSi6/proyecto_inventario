import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlmacenController } from './almacen.controller';
import { Almacen } from './almacen.entity'; // Debe coincidir con la entidad real
import { AlmacenService } from './almacen.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Almacen]),
  ],
  controllers: [AlmacenController],
  providers: [AlmacenService],
})
export class AlmacenModule {}