import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly repo: Repository<Categoria>,
  ) {}

  // LISTAR TODAS
  async listar(): Promise<Categoria[]> {
    return this.repo.find();
  }

  // BUSCAR POR ID
  async obtenerPorId(id: number): Promise<Categoria> {
    const categoria = await this.repo.findOneBy({ id_categoria: id });

    if (!categoria) {
      throw new NotFoundException('Categoría no encontrada');
    }

    return categoria;
  }

  // CREAR
async crear(data: CreateCategoriaDto): Promise<Categoria> {
    const nueva = this.repo.create({
      nombre: data.nombre,
      descripcion: data.descripcion, 
      fecha_creacion: new Date(),
      activo: true,
    });

    return this.repo.save(nueva);
}

  // ACTUALIZAR
  async actualizar(id: number, cambios: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.obtenerPorId(id);

    Object.assign(categoria, cambios);

    return this.repo.save(categoria);
  }

  // ELIMINAR (soft delete → poner activo = false)
  async eliminar(id: number): Promise<boolean> {
    const categoria = await this.obtenerPorId(id);

    categoria.activo = false;
    await this.repo.save(categoria);

    return true;
  }
}
