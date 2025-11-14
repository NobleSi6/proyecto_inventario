import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createDto: CreateCategoriaDto): Promise<Categoria> {
    const categoria = this.categoriaRepository.create(createDto);
    return this.categoriaRepository.save(categoria);
  }

  findAll(): Promise<Categoria[]> {
    // Solo busca categorías activas por defecto
    return this.categoriaRepository.find({ where: { activo: true } });
  }

  async findOne(id: number): Promise<Categoria> {
    // Busca por nueva PK id_categoria y estado activo
    const categoria = await this.categoriaRepository.findOne({ where: { id_categoria: id, activo: true } });
    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada.`);
    }
    return categoria;
  }

  async update(id: number, updateDto: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.findOne(id);
    this.categoriaRepository.merge(categoria, updateDto);
    return this.categoriaRepository.save(categoria);
  }

  async remove(id: number): Promise<void> {
    // Soft Delete (inactiva el registro)
    const result = await this.categoriaRepository.update(id, { activo: false });
    if (result.affected === 0) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada.`);
    }
  }
}