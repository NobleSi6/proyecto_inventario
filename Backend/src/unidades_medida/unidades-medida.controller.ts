import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { UnidadesMedidaService } from './unidades-medida.service';
import { CreateUnidadMedidaDto } from './dto/create-unidad-medida.dto';
import { UpdateUnidadMedidaDto } from './dto/update-unidad-medida.dto';
import { UnidadMedida } from './unidades-medida.entity'; // Importamos la entidad

@Controller('unidades-medida')
export class UnidadesMedidaController {
  constructor(private readonly unidadesMedidaService: UnidadesMedidaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDto: CreateUnidadMedidaDto): Promise<UnidadMedida> { // Tipificado
    return this.unidadesMedidaService.create(createDto);
  }

  @Get()
  findAll(): Promise<UnidadMedida[]> { // Tipificado
    return this.unidadesMedidaService.findAll();
  }

  @Get(':id')
  // 🚨 CORRECCIÓN: Usamos ParseIntPipe
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UnidadMedida> { // Tipificado
    return this.unidadesMedidaService.findOne(id);
  }

  @Patch(':id')
  // 🚨 CORRECCIÓN: Usamos ParseIntPipe
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUnidadMedidaDto,
  ): Promise<UnidadMedida> { // Tipificado
    return this.unidadesMedidaService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  // 🚨 CORRECCIÓN: Usamos ParseIntPipe
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> { // Soft Delete
    return this.unidadesMedidaService.remove(id);
  }

  // 🚨 ADICIÓN: Endpoint para Borrado Permanente (Hard Delete)
  @Delete('permanent/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  hardRemove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.unidadesMedidaService.hardRemove(id);
  }
}