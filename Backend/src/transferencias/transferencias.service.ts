import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Transferencia } from './transferencia.entity';
import { CreateTransferenciaDto } from './dto/create-transferencia.dto';
import { UpdateTransferenciaDto } from './dto/update-transferencia.dto';

@Injectable()
export class TransferenciasService {
  constructor(
    @InjectRepository(Transferencia)
    private readonly repo: Repository<Transferencia>,
  ) {}

  async create(dto: CreateTransferenciaDto): Promise<Transferencia> {
    const dup = await this.repo.findOne({ where: { numero_transferencia: dto.numero_transferencia } });
    if (dup) throw new BadRequestException(`numero_transferencia '${dto.numero_transferencia}' ya existe`);
    const entity = this.repo.create({ ...dto, activo: dto.activo ?? true });
    return await this.repo.save(entity);
  }

  async findAll(opts?: {
    q?: string;
    id_almacen_origen?: number;
    id_almacen_destino?: number;
    id_empleado_autoriza?: number;
    id_empleado_solicitante?: number;
    estado?: number;
    desde?: string;
    hasta?: string;
    recibidaDesde?: string;
    recibidaHasta?: string;
    activo?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ data: Transferencia[]; total: number; page: number; limit: number; }> {
    const page = Math.max(1, opts?.page ?? 1);
    const limit = Math.min(100, Math.max(1, opts?.limit ?? 20));
    const where: any = {};

    if (opts?.q) where.numero_transferencia = ILike(`%${opts.q}%`);
    if (opts?.id_almacen_origen !== undefined) where.id_almacen_origen = opts.id_almacen_origen;
    if (opts?.id_almacen_destino !== undefined) where.id_almacen_destino = opts.id_almacen_destino;
    if (opts?.id_empleado_autoriza !== undefined) where.id_empleado_autoriza = opts.id_empleado_autoriza;
    if (opts?.id_empleado_solicitante !== undefined) where.id_empleado_solicitante = opts.id_empleado_solicitante;
    if (opts?.estado !== undefined) where.estado = opts.estado;
    if (opts?.activo !== undefined) where.activo = opts.activo;

    const qb = this.repo.createQueryBuilder('t').where(where);

    if (opts?.desde) qb.andWhere('t.fecha_transferencia >= :desde', { desde: opts.desde });
    if (opts?.hasta) qb.andWhere('t.fecha_transferencia <= :hasta', { hasta: opts.hasta });
    if (opts?.recibidaDesde) qb.andWhere('t.fecha_recepcion >= :rdesde', { rdesde: opts.recibidaDesde });
    if (opts?.recibidaHasta) qb.andWhere('t.fecha_recepcion <= :rhasta', { rhasta: opts.recibidaHasta });

    qb.orderBy('t.fecha_transferencia', 'DESC')
      .addOrderBy('t.id_transferencia', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, total, page, limit };
  }

  async findOne(id_transferencia: number): Promise<Transferencia> {
    const t = await this.repo.findOne({ where: { id_transferencia } });
    if (!t) throw new NotFoundException(`Transferencia ${id_transferencia} no existe`);
    return t;
  }

  async update(id_transferencia: number, dto: UpdateTransferenciaDto): Promise<Transferencia> {
    const t = await this.findOne(id_transferencia);
    if (dto.numero_transferencia && dto.numero_transferencia !== t.numero_transferencia) {
      const exists = await this.repo.findOne({ where: { numero_transferencia: dto.numero_transferencia } });
      if (exists) throw new BadRequestException(`numero_transferencia '${dto.numero_transferencia}' ya existe`);
    }
    Object.assign(t, dto);
    return await this.repo.save(t);
  }

  async remove(id_transferencia: number): Promise<void> {
    const t = await this.findOne(id_transferencia);
    t.activo = false;
    await this.repo.save(t);
  }

  async restore(id_transferencia: number): Promise<Transferencia> {
    const t = await this.findOne(id_transferencia);
    t.activo = true;
    return await this.repo.save(t);
  }

  async hardDelete(id_transferencia: number): Promise<void> {
    const result = await this.repo.delete({ id_transferencia });
    if (result.affected === 0) throw new NotFoundException(`Transferencia ${id_transferencia} no existe`);
  }
}