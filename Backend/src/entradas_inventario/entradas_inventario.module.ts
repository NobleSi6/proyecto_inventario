// entradas-inventario.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntradasInventarioService } from './entradas_inventario.service';
import { EntradasInventarioController } from './entradas_inventario.controller';
import { EntradaInventario } from './entities/entradas_inventario.entity'; // Asegúrate de la ruta

@Module({
  imports: [
    TypeOrmModule.forFeature([EntradaInventario]), // ESTO ES LO QUE FALTABA
  ],
  controllers: [EntradasInventarioController],
  providers: [EntradasInventarioService],
})
export class EntradasInventarioModule {}