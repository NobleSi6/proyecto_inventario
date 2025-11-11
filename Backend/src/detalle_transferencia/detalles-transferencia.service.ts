import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleTransferencia } from './detalle-transferencia.entity';
import { CreateDetalleTransferenciaDto } from './dto/create-detalle-transferencia.dto';
import { UpdateDetalleTransferenciaDto } from './dto/update-detalle-transferencia.dto';
import { CreateManyDetallesTransferenciaDto } from './dto/create-many-detalles-transferencia.dto';

@Injectable()
export class DetallesTransferenciaService {
  constructor(
    @InjectRepository(DetalleTransferencia)
    private readonly repo: Repository<DetalleTransferencia>,
  ) {}

  async create(dto: CreateDetalleTransferenciaDto): Promise<DetalleTransferencia> {
    if (dto.cantidad !== undefined && dto.cantidad <= 0) {
      throw new BadRequestException('cantidad debe ser > 0');
    }
    if (dto.cantidad_recibida !== undefined && dto.cantidad_recibida < 0) {
      throw new BadRequestException('cantidad_recibida no puede ser negativa');
    }
    const entity = this.repo.create({ ...dto, activo: dto.activo ?? true });
    return await this.repo.save(entity);
  }

  async createMany(payload: CreateManyDetallesTransferenciaDto): Promise<DetalleTransferencia[]> {
    const items = payload.items ?? [];
    if (!items.length) throw new BadRequestException('items vacío');
    for (const it of items) {
      if (it.cantidad === undefined || it.cantidad <= 0) {
        throw new BadRequestException('cada item debe tener cantidad > 0');
      }
      if (it.cantidad_recibida !== undefined && it.cantidad_recibida < 0) {
        throw new BadRequestException('cantidad_recibida no puede ser negativa');
      }
    }
    const entities = this.repo.create(items.map(i => ({ ...i, activo: i.activo ?? true })));
    return await this.repo.save(entities);
  }

  async findAll(opts?: {
    id_transferencia?: number;
    id_material?: number;
    activo?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ data: DetalleTransferencia[]; total: number; page: number; limit: number; }> {
    const page = Math.max(1, opts?.page ?? 1);
    const limit = Math.min(100, Math.max(1, opts?.limit ?? 20));

    const where: any = {};
    if (opts?.id_transferencia !== undefined) where.id_transferencia = opts.id_transferencia;
    if (opts?.id_material !== undefined) where.id_material = opts.id_material;
    if (opts?.activo !== undefined) where.activo = opts.activo;

    const [data, total] = await this.repo.findAndCount({
      where,
      order: { id_detalle_transferencia: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total, page, limit };
  }

  async findOne(id_detalle_transferencia: number): Promise<DetalleTransferencia> {
    const det = await this.repo.findOne({ where: { id_detalle_transferencia } });
    if (!det) throw new NotFoundException(`Detalle transferencia ${id_detalle_transferencia} no existe`);
    return det;
  }

  async update(id_detalle_transferencia: number, dto: UpdateDetalleTransferenciaDto): Promise<DetalleTransferencia> {
    const det = await this.findOne(id_detalle_transferencia);
    if (dto.cantidad !== undefined && dto.cantidad <= 0) {
      throw new BadRequestException('cantidad debe ser > 0');
    }
    if (dto.cantidad_recibida !== undefined && dto.cantidad_recibida < 0) {
      throw new BadRequestException('cantidad_recibida no puede ser negativa');
    }
    Object.assign(det, dto);
    return await this.repo.save(det);
  }

  async remove(id_detalle_transferencia: number): Promise<void> {
    const det = await this.findOne(id_detalle_transferencia);
    det.activo = false;
    await this.repo.save(det);
  }

  async restore(id_detalle_transferencia: number): Promise<DetalleTransferencia> {
    const det = await this.findOne(id_detalle_transferencia);
    det.activo = true;
    return await this.repo.save(det);
  }

  async hardDelete(id_detalle_transferencia: number): Promise<void> {
    const result = await this.repo.delete({ id_detalle_transferencia });
    if (result.affected === 0) {
      throw new NotFoundException(`Detalle transferencia ${id_detalle_transferencia} no existe`);
    }
  }
}