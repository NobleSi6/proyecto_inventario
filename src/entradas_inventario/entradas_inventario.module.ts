import { Module } from '@nestjs/common';
import { EntradasInventarioService } from './entradas_inventario.service';
import { EntradasInventarioController } from './entradas_inventario.controller';

@Module({
  controllers: [EntradasInventarioController],
  providers: [EntradasInventarioService],
})
export class EntradasInventarioModule {}
