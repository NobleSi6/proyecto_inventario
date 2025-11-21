import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Material } from './entities/material.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { UnidadMedida } from 'src/unidades_medida/entities/unidad_medida.entity';

import { CrearMaterialDto } from './dto/create-material.dto';
import { ActualizarMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialesService {
  constructor(
    @InjectRepository(Material)
    private readonly repo: Repository<Material>,

    @InjectRepository(Categoria)
    private readonly catRepo: Repository<Categoria>,

    @InjectRepository(UnidadMedida)
    private readonly unidadRepo: Repository<UnidadMedida>,
  ) {}

  // 📌 Listar todo
  async listar(): Promise<Material[]> {
    return this.repo.find();
  }

  // 📌 Obtener por ID
  async obtenerPorId(id: number): Promise<Material> {
    const m = await this.repo.findOneBy({ id });
    if (!m) throw new NotFoundException('Material no encontrado');
    return m;
  }

  // 📌 Crear material
  async crear(data: CrearMaterialDto): Promise<Material> {
    // Verificar categoría
    const categoria = await this.catRepo.findOneBy({ id_categoria: data.idCategoria });
    if (!categoria) throw new NotFoundException('Categoría no encontrada');

    // Verificar unidad
    const unidad = await this.unidadRepo.findOneBy({ id_unidad: data.idUnidad });
    if (!unidad) throw new NotFoundException('Unidad de medida no encontrada');

    const nuevo = this.repo.create({
      codigo: data.codigo,
      nombre: data.nombre,
      descripcion: data.descripcion,

      idCategoria: data.idCategoria,
      idUnidad: data.idUnidad,

      precioUnitario: data.precioUnitario,
      stockMinimo: data.stockMinimo ?? 0,
      stockMaximo: data.stockMaximo ?? 0,

      ubicacionAlmacen: data.ubicacionAlmacen,
      activo: data.activo ?? true,
    });

    return this.repo.save(nuevo);
  }

  // 📌 Actualizar material
  async actualizar(id: number, cambios: ActualizarMaterialDto) {
    const material = await this.obtenerPorId(id);

    // Si cambia la categoría
    if (cambios.idCategoria) {
      const categoria = await this.catRepo.findOneBy({ id_categoria: cambios.idCategoria });
      if (!categoria) throw new NotFoundException('Categoría no encontrada');
    }

    // Si cambia la unidad
    if (cambios.idUnidad) {
      const unidad = await this.unidadRepo.findOneBy({ id_unidad: cambios.idUnidad });
      if (!unidad) throw new NotFoundException('Unidad de medida no encontrada');
    }

    Object.assign(material, cambios);
    return this.repo.save(material);
  }

  // 📌 Eliminar material
  async eliminar(id: number) {
    const res = await this.repo.delete(id);
    return (res.affected ?? 0) > 0;
  }
}
