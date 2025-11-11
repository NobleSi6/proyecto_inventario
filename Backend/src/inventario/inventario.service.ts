// src/inventario/inventario.service.ts

import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemInventario } from './item-inventario.entity';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(ItemInventario)
    private itemRepository: Repository<ItemInventario>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<ItemInventario> {
    
    // Opcional: Verificar si el SKU ya existe
    const existingItem = await this.itemRepository.findOne({ where: { sku: createItemDto.sku } });
    if (existingItem) {
        throw new BadRequestException(`El SKU ${createItemDto.sku} ya existe en el inventario.`);
    }

    // Mapear el DTO a la entidad
    const newItem = this.itemRepository.create({
      sku: createItemDto.sku,
      nombre: createItemDto.nombre,
      descripcion: createItemDto.descripcion,
      unidadMedida: createItemDto.unidadMedida,
      stockActual: createItemDto.cantidad, // La cantidad es el stock inicial
      costoUnitario: createItemDto.costoUnitario || 0,
      estado: createItemDto.estado,
      ubicacionInterna: createItemDto.ubicacionInterna, 
    });

    return this.itemRepository.save(newItem);
  }
  
  // (Aquí irán los métodos findAll, findOne, update, delete...)

   // NUEVA FUNCIÓN: Obtener todos los ítems de inventario
  async findAll(): Promise<ItemInventario[]> {
    // El método .find() sin argumentos trae todos los registros de la tabla.
    return this.itemRepository.find();
  }

    async findOne(id: number): Promise<ItemInventario> {
    const item = await this.itemRepository.findOneBy({ id });

    if (!item) {
      // Lanza una excepción 404 si el ID no existe
      throw new NotFoundException(`Ítem de Inventario con ID ${id} no encontrado.`);
    }
    
    return item;
  }
}