// configuracion-service/src/estados/estados.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadosService } from './estados.service';
import { Estado } from './entities/estado.entity'; // ← Tu entidad

@Module({
  imports: [
    TypeOrmModule.forFeature([Estado]), // ← ¡CLAVE! Registra el repositorio
  ],
  providers: [EstadosService],
  exports: [EstadosService],
})
export class EstadosModule {}