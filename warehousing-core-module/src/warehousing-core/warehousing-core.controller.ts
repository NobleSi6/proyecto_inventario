// src/warehousing-core/warehousing-core.controller.ts
import { Controller, Get, Post, Body, Param, ParseIntPipe, Query, Patch } from '@nestjs/common';
import { WarehousingCoreService } from './warehousing-core.service';
import { ProcessMovementDto } from './dto/process-movement.dto';
import { CreateTransferRequestDto } from './dto/create-transfer-request.dto'; // Debes crear este DTO

@Controller('warehousing')
export class WarehousingCoreController {
  constructor(private readonly coreService: WarehousingCoreService) {}

  // =========================
  // Control de Existencias
  // =========================

  @Get('stock/:id_almacen/:id_material')
  getStock(
    @Param('id_almacen', ParseIntPipe) id_almacen: number,
    @Param('id_material', ParseIntPipe) id_material: number,
  ) {
    return this.coreService.getStock(id_almacen, id_material);
  }

  // =========================
  // Movimientos de Stock
  // =========================

  @Post('movement/entry')
  processEntry(@Body() dto: ProcessMovementDto) {
    return this.coreService.processMovement(dto, 'ENTRADA');
  }

  @Post('movement/exit')
  processExit(@Body() dto: ProcessMovementDto) {
    return this.coreService.processMovement(dto, 'SALIDA');
  }

  // =========================
  // Gestión de Transferencias
  // =========================
  
  @Post('transfer')
  createTransfer(@Body() dto: CreateTransferRequestDto) {
    return this.coreService.createTransfer(dto);
  }

  @Patch('transfer/:id_transferencia/complete')
  completeTransfer(
    @Param('id_transferencia', ParseIntPipe) id_transferencia: number,
    @Body('id_empleado_receptor', ParseIntPipe) id_empleado_receptor: number,
  ) {
    return this.coreService.completeTransfer(id_transferencia, id_empleado_receptor);
  }
}