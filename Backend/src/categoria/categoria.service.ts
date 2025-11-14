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

  // Ahora devuelve todas las activas, como antes.
  findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find({ where: { activo: true } });
  }

  // Encuentra solo activas. Lanza error si no existe o está inactiva.
  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({ 
      where: { id_categoria: id, activo: true } 
    });
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

  // 1. Borrado Lógico (Soft Delete)
  // Desactiva el registro, manteniendo la integridad referencial.
  async remove(id: number): Promise<void> {
    // Busca primero para asegurar que existe y está activa. Si no, lanza NotFoundException.
    await this.findOne(id); 

    // Realiza el soft delete.
    await this.categoriaRepository.update(id, { activo: false });
  }

  // 2. Borrado Permanente (Hard Delete)
  // Elimina el registro de la base de datos. ¡Cuidado con la integridad referencial!
  async hardRemove(id: number): Promise<void> {
    // Es buena práctica buscar primero, pero aquí no filtramos por `activo: true`
    // ya que queremos poder borrar registros activos e inactivos.
    // Usaremos `delete` de TypeORM y verificaremos el resultado.
    const result = await this.categoriaRepository.delete(id);

    if (result.affected === 0) {
      // Si no se borró ninguna fila, significa que la categoría con ese ID no existía.
      throw new NotFoundException(`Categoría con ID ${id} no encontrada para borrado permanente.`);
    }
    
    // NOTA IMPORTANTE: Si la tabla tiene relaciones con ON DELETE RESTRICT, 
    // PostgreSQL lanzará un error de Foreign Key antes de llegar a esta línea, 
    // y NestJS lo convertirá en un InternalServerError (500).
  }
}