import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Material } from './material.entity';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialesService {
  constructor(
    @InjectRepository(Material)
    private readonly repo: Repository<Material>,
  ) {}

  async create(dto: CreateMaterialDto): Promise<Material> {
    const dup = await this.repo.findOne({ where: { codigo: dto.codigo } });
    if (dup) throw new BadRequestException(`codigo '${dto.codigo}' ya existe`);
    const entity = this.repo.create({ ...dto, activo: dto.activo ?? true });
    return await this.repo.save(entity);
  }

  async findAll(opts?: {
    q?: string; // busca en codigo y nombre
    id_categoria?: number;
    id_unidad?: number;
    precioMin?: number;
    precioMax?: number;
    activo?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ data: Material[]; total: number; page: number; limit: number; }> {
    const page = Math.max(1, opts?.page ?? 1);
    const limit = Math.min(100, Math.max(1, opts?.limit ?? 20));

    const qb = this.repo.createQueryBuilder('m');

    if (opts?.q) {
      qb.andWhere('(m.codigo ILIKE :q OR m.nombre ILIKE :q)', { q: `%${opts.q}%` });
    }
    if (opts?.id_categoria !== undefined) qb.andWhere('m.id_categoria = :idc', { idc: opts.id_categoria });
    if (opts?.id_unidad !== undefined) qb.andWhere('m.id_unidad = :idu', { idu: opts.id_unidad });
    if (opts?.precioMin !== undefined) qb.andWhere('m.precio_unitario >= :pmin', { pmin: opts.precioMin });
    if (opts?.precioMax !== undefined) qb.andWhere('m.precio_unitario <= :pmax', { pmax: opts.precioMax });
    if (opts?.activo !== undefined) qb.andWhere('m.activo = :act', { act: opts.activo });

    qb.orderBy('m.nombre', 'ASC')
      .addOrderBy('m.codigo', 'ASC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, total, page, limit };
  }

  async findOne(id_material: number): Promise<Material> {
    const mat = await this.repo.findOne({ where: { id_material } });
    if (!mat) throw new NotFoundException(`Material ${id_material} no existe`);
    return mat;
  }

  async update(id_material: number, dto: UpdateMaterialDto): Promise<Material> {
    const mat = await this.findOne(id_material);
    if (dto.codigo && dto.codigo !== mat.codigo) {
      const exists = await this.repo.findOne({ where: { codigo: dto.codigo } });
      if (exists) throw new BadRequestException(`codigo '${dto.codigo}' ya existe`);
    }
    Object.assign(mat, dto);
    return await this.repo.save(mat);
  }

  async remove(id_material: number): Promise<void> {
    const mat = await this.findOne(id_material);
    mat.activo = false;
    await this.repo.save(mat);
  }

  async restore(id_material: number): Promise<Material> {
    const mat = await this.findOne(id_material);
    mat.activo = true;
    return await this.repo.save(mat);
  }

  async hardDelete(id_material: number): Promise<void> {
    const result = await this.repo.delete({ id_material });
    if (result.affected === 0) throw new NotFoundException(`Material ${id_material} no existe`);
  }
}