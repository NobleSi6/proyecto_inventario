import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Repository } from 'typeorm';
import { HistorialMovimiento } from './historial-movimiento.entity';
import { CreateHistorialMovimientoDto } from './dto/create-historial-movimiento.dto';
import { UpdateHistorialMovimientoDto } from './dto/update-historial-movimiento.dto';

@Injectable()
export class HistorialMovimientosService {
  constructor(
    @InjectRepository(HistorialMovimiento)
    private readonly repo: Repository<HistorialMovimiento>,
  ) {}

  async create(dto: CreateHistorialMovimientoDto): Promise<HistorialMovimiento> {
    const entity = this.repo.create({ ...dto, activo: dto.activo ?? true });
    return await this.repo.save(entity);
  }

  async findAll(opts?: {
    q?: string; // busca por referencia
    tipo?: string;
    id_material?: number;
    id_almacen?: number;
    id_empleado?: number;
    desde?: string;
    hasta?: string;
    activo?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ data: HistorialMovimiento[]; total: number; page: number; limit: number; }> {
    const page = Math.max(1, opts?.page ?? 1);
    const limit = Math.min(100, Math.max(1, opts?.limit ?? 20));

    const qb = this.repo.createQueryBuilder('h');

    if (opts?.q) qb.andWhere('h.referencia ILIKE :q', { q: `%${opts.q}%` });
    if (opts?.tipo) qb.andWhere('h.tipo_movimiento = :tp', { tp: opts.tipo });
    if (opts?.id_material !== undefined) qb.andWhere('h.id_material = :idm', { idm: opts.id_material });
    if (opts?.id_almacen !== undefined) qb.andWhere('h.id_almacen = :ida', { ida: opts.id_almacen });
    if (opts?.id_empleado !== undefined) qb.andWhere('h.id_empleado = :ide', { ide: opts.id_empleado });
    if (opts?.desde) qb.andWhere('h.fecha_movimiento >= :desde', { desde: opts.desde });
    if (opts?.hasta) qb.andWhere('h.fecha_movimiento <= :hasta', { hasta: opts.hasta });
    if (opts?.activo !== undefined) qb.andWhere('h.activo = :act', { act: opts.activo });

    qb.orderBy('h.fecha_movimiento', 'DESC')
      .addOrderBy('h.id_movimiento', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, total, page, limit };
  }

  async findOne(id_movimiento: number): Promise<HistorialMovimiento> {
    const h = await this.repo.findOne({ where: { id_movimiento } });
    if (!h) throw new NotFoundException(`Movimiento ${id_movimiento} no existe`);
    return h;
  }

  async update(id_movimiento: number, dto: UpdateHistorialMovimientoDto): Promise<HistorialMovimiento> {
    const h = await this.findOne(id_movimiento);
    Object.assign(h, dto);
    return await this.repo.save(h);
  }

  async remove(id_movimiento: number): Promise<void> {
    const h = await this.findOne(id_movimiento);
    h.activo = false;
    await this.repo.save(h);
  }

  async restore(id_movimiento: number): Promise<HistorialMovimiento> {
    const h = await this.findOne(id_movimiento);
    h.activo = true;
    return await this.repo.save(h);
  }

  async hardDelete(id_movimiento: number): Promise<void> {
    const result = await this.repo.delete({ id_movimiento });
    if (result.affected === 0) {
      throw new NotFoundException(`Movimiento ${id_movimiento} no existe`);
    }
  }
}