import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Salida } from './salida.entity';
import { CreateSalidaDto } from './dto/create-salida.dto';
import { UpdateSalidaDto } from './dto/update-salida.dto';

@Injectable()
export class SalidasService {
  constructor(
    @InjectRepository(Salida)
    private readonly repo: Repository<Salida>,
  ) {}

  async create(dto: CreateSalidaDto): Promise<Salida> {
    // numero_salida es único en la BD
    const dup = await this.repo.findOne({ where: { numero_salida: dto.numero_salida } });
    if (dup) {
      throw new BadRequestException(`numero_salida '${dto.numero_salida}' ya existe`);
    }
    const entity = this.repo.create({ ...dto, activo: dto.activo ?? true });
    return await this.repo.save(entity);
  }

  async findAll(opts?: {
    q?: string; // filtro por numero_salida
    id_almacen?: number;
    id_proyecto?: number;
    desde?: string; // ISO date inclusive
    hasta?: string; // ISO date inclusive
    activo?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ data: Salida[]; total: number; page: number; limit: number; }> {
    const page = Math.max(1, opts?.page ?? 1);
    const limit = Math.min(100, Math.max(1, opts?.limit ?? 20));
    const where: any = {};

    if (opts?.q) where.numero_salida = ILike(`%${opts.q}%`);
    if (opts?.id_almacen !== undefined) where.id_almacen = opts.id_almacen;
    if (opts?.id_proyecto !== undefined) where.id_proyecto = opts.id_proyecto;
    if (opts?.activo !== undefined) where.activo = opts.activo;

    const qb = this.repo.createQueryBuilder('s').where(where);

    if (opts?.desde) qb.andWhere('s.fecha_salida >= :desde', { desde: opts.desde });
    if (opts?.hasta) qb.andWhere('s.fecha_salida <= :hasta', { hasta: opts.hasta });

    qb.orderBy('s.fecha_salida', 'DESC')
      .addOrderBy('s.id_salida', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, total, page, limit };
  }

  async findOne(id_salida: number): Promise<Salida> {
    const salida = await this.repo.findOne({ where: { id_salida } });
    if (!salida) throw new NotFoundException(`Salida ${id_salida} no existe`);
    return salida;
  }

  async update(id_salida: number, dto: UpdateSalidaDto): Promise<Salida> {
    const salida = await this.findOne(id_salida);

    if (dto.numero_salida && dto.numero_salida !== salida.numero_salida) {
      const exists = await this.repo.findOne({ where: { numero_salida: dto.numero_salida } });
      if (exists) throw new BadRequestException(`numero_salida '${dto.numero_salida}' ya existe`);
    }

    Object.assign(salida, dto);
    return await this.repo.save(salida);
  }

  async remove(id_salida: number): Promise<void> {
    const salida = await this.findOne(id_salida);
    salida.activo = false; // baja lógica
    await this.repo.save(salida);
  }

  async restore(id_salida: number): Promise<Salida> {
    const salida = await this.findOne(id_salida);
    salida.activo = true;
    return await this.repo.save(salida);
  }


/**
   * Elimina físicamente la salida (DELETE FROM salidas_inventario WHERE id_salida = :id).
   * Lanza NotFound si no existe.
   * OJO: puede fallar si hay FKs sin ON DELETE CASCADE (p.ej., detalle_salida).
   */
  async hardDelete(id_salida: number): Promise<void> {
    const result = await this.repo.delete({ id_salida });
    if (result.affected === 0) {
      throw new NotFoundException(`Salida ${id_salida} no existe`);
    }
  }

}