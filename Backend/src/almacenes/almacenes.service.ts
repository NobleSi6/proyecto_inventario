import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Almacen } from './almacen.entity';
import { CreateAlmacenDto } from './dto/create-almacen.dto';
import { UpdateAlmacenDto } from './dto/update-almacen.dto';

@Injectable()
export class AlmacenesService {
  constructor(
    @InjectRepository(Almacen)
    private readonly repo: Repository<Almacen>,
  ) {}

  async create(dto: CreateAlmacenDto): Promise<Almacen> {
    if (dto.codigo) {
      const dup = await this.repo.findOne({ where: { codigo: dto.codigo } });
      if (dup) throw new BadRequestException(`codigo '${dto.codigo}' ya existe`);
    }
    const entity = this.repo.create({ ...dto, activo: dto.activo ?? true });
    return await this.repo.save(entity);
  }

  async findAll(opts?: {
    q?: string; // busca en nombre y codigo
    ciudad?: string;
    responsable?: number;
    activo?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ data: Almacen[]; total: number; page: number; limit: number; }> {
    const page = Math.max(1, opts?.page ?? 1);
    const limit = Math.min(100, Math.max(1, opts?.limit ?? 20));

    const qb = this.repo.createQueryBuilder('a');

    if (opts?.q) {
      qb.andWhere('(a.nombre ILIKE :q OR a.codigo ILIKE :q)', { q: `%${opts.q}%` });
    }
    if (opts?.ciudad !== undefined) qb.andWhere('a.ciudad = :cd', { cd: opts.ciudad });
    if (opts?.responsable !== undefined) qb.andWhere('a.responsable = :resp', { resp: opts.responsable });
    if (opts?.activo !== undefined) qb.andWhere('a.activo = :act', { act: opts.activo });

    qb.orderBy('a.nombre', 'ASC')
      .addOrderBy('a.id_almacen', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, total, page, limit };
  }

  async findOne(id_almacen: number): Promise<Almacen> {
    const al = await this.repo.findOne({ where: { id_almacen } });
    if (!al) throw new NotFoundException(`Almacén ${id_almacen} no existe`);
    return al;
  }

  async update(id_almacen: number, dto: UpdateAlmacenDto): Promise<Almacen> {
    const al = await this.findOne(id_almacen);
    if (dto.codigo && dto.codigo !== al.codigo) {
      const exists = await this.repo.findOne({ where: { codigo: dto.codigo } });
      if (exists) throw new BadRequestException(`codigo '${dto.codigo}' ya existe`);
    }
    Object.assign(al, dto);
    return await this.repo.save(al);
  }

  async remove(id_almacen: number): Promise<void> {
    const al = await this.findOne(id_almacen);
    al.activo = false;
    await this.repo.save(al);
  }

  async restore(id_almacen: number): Promise<Almacen> {
    const al = await this.findOne(id_almacen);
    al.activo = true;
    return await this.repo.save(al);
  }

  async hardDelete(id_almacen: number): Promise<void> {
    const result = await this.repo.delete({ id_almacen });
    if (result.affected === 0) throw new NotFoundException(`Almacén ${id_almacen} no existe`);
  }
}