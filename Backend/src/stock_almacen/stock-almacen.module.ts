import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockAlmacenService } from './stock-almacen.service';
import { StockAlmacenController } from './stock-almacen.controller';
import { StockAlmacen } from './stock-almacen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockAlmacen])],
  controllers: [StockAlmacenController],
  providers: [StockAlmacenService],
  exports: [TypeOrmModule, StockAlmacenService],
})
export class StockAlmacenModule {}