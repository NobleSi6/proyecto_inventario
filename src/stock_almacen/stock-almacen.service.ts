import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockAlmacen } from './stock-almacen.entity';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StockAlmacenService {
  constructor(
    @InjectRepository(StockAlmacen)
    private readonly repo: Repository<StockAlmacen>,
  ) {}

  async create(dto: CreateStockDto): Promise<StockAlmacen> {
    // Enforce unique pair (id_material, id_almacen)
    const dup = await this.repo.findOne({ where: { id_material: dto.id_material, id_almacen: dto.id_almacen } });
    if (dup) {
      throw new BadRequestException(`Ya existe stock para material ${dto.id_material} en almacén ${dto.id_almacen}`);
    }
    const entity = this.repo.create({
      ...dto,
      cantidad_disponible: dto.cantidad_disponible ?? 0,
      cantidad_reservada: dto.cantidad_reservada ?? 0,
      activo: dto.activo ?? true,
      ultima_actualizacion: new Date(),
    });
    return await this.repo.save(entity);
  }

  async findAll(opts?: {
    id_material?: number;
    id_almacen?: number;
    activo?: boolean;
    dispMin?: number;
    dispMax?: number;
    resMin?: number;
    resMax?: number;
    page?: number;
    limit?: number;
  }): Promise<{ data: StockAlmacen[]; total: number; page: number; limit: number; }> {
    const page = Math.max(1, opts?.page ?? 1);
    const limit = Math.min(100, Math.max(1, opts?.limit ?? 20));

    const qb = this.repo.createQueryBuilder('s');

    if (opts?.id_material !== undefined) qb.andWhere('s.id_material = :idm', { idm: opts.id_material });
    if (opts?.id_almacen !== undefined) qb.andWhere('s.id_almacen = :ida', { ida: opts.id_almacen });
    if (opts?.activo !== undefined) qb.andWhere('s.activo = :act', { act: opts.activo });

    if (opts?.dispMin !== undefined) qb.andWhere('s.cantidad_disponible >= :dmin', { dmin: opts.dispMin });
    if (opts?.dispMax !== undefined) qb.andWhere('s.cantidad_disponible <= :dmax', { dmax: opts.dispMax });
    if (opts?.resMin !== undefined) qb.andWhere('s.cantidad_reservada >= :rmin', { rmin: opts.resMin });
    if (opts?.resMax !== undefined) qb.andWhere('s.cantidad_reservada <= :rmax', { rmax: opts.resMax });

    qb.orderBy('s.id_almacen', 'ASC')
      .addOrderBy('s.id_material', 'ASC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, total, page, limit };
  }

  async findOne(id_stock: number): Promise<StockAlmacen> {
    const st = await this.repo.findOne({ where: { id_stock } });
    if (!st) throw new NotFoundException(`Stock ${id_stock} no existe`);
    return st;
  }

  async update(id_stock: number, dto: UpdateStockDto): Promise<StockAlmacen> {
    const st = await this.findOne(id_stock);

    // If trying to change pair, check uniqueness
    if ((dto.id_material && dto.id_material !== st.id_material) || (dto.id_almacen && dto.id_almacen !== st.id_almacen)) {
      const exists = await this.repo.findOne({
        where: {
          id_material: dto.id_material ?? st.id_material,
          id_almacen: dto.id_almacen ?? st.id_almacen,
        },
      });
      if (exists && exists.id_stock !== id_stock) {
        throw new BadRequestException(`Ya existe stock para material ${dto.id_material ?? st.id_material} en almacén ${dto.id_almacen ?? st.id_almacen}`);
      }
    }

    Object.assign(st, dto);
    st.ultima_actualizacion = new Date();
    return await this.repo.save(st);
  }

  async remove(id_stock: number): Promise<void> {
    const st = await this.findOne(id_stock);
    st.activo = false;
    st.ultima_actualizacion = new Date();
    await this.repo.save(st);
  }

  async restore(id_stock: number): Promise<StockAlmacen> {
    const st = await this.findOne(id_stock);
    st.activo = true;
    st.ultima_actualizacion = new Date();
    return await this.repo.save(st);
  }

  async hardDelete(id_stock: number): Promise<void> {
    const result = await this.repo.delete({ id_stock });
    if (result.affected === 0) throw new NotFoundException(`Stock ${id_stock} no existe`);
  }
}