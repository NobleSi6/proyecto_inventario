import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleSalida } from './detalle-salida.entity';
import { CreateDetalleSalidaDto } from './dto/create-detalle-salida.dto';
import { UpdateDetalleSalidaDto } from './dto/update-detalle-salida.dto';
import { CreateManyDetallesDto } from './dto/create-many-detalles.dto';

@Injectable()
export class DetallesSalidaService {
  constructor(
    @InjectRepository(DetalleSalida)
    private readonly repo: Repository<DetalleSalida>,
  ) {}

  async create(dto: CreateDetalleSalidaDto): Promise<DetalleSalida> {
    if (dto.cantidad !== undefined && dto.cantidad <= 0) {
      throw new BadRequestException('cantidad debe ser > 0');
    }
    const entity = this.repo.create({ ...dto, activo: dto.activo ?? true });
    return await this.repo.save(entity);
  }

  async createMany(payload: CreateManyDetallesDto): Promise<DetalleSalida[]> {
    const items = payload.items ?? [];
    if (!items.length) throw new BadRequestException('items vacío');
    for (const it of items) {
      if (it.cantidad === undefined || it.cantidad <= 0) {
        throw new BadRequestException('cada item debe tener cantidad > 0');
      }
    }
    const entities = this.repo.create(items.map(i => ({ ...i, activo: i.activo ?? true })));
    return await this.repo.save(entities);
  }

  async findAll(opts?: {
    id_salida?: number;
    id_material?: number;
    activo?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ data: DetalleSalida[]; total: number; page: number; limit: number; }> {
    const page = Math.max(1, opts?.page ?? 1);
    const limit = Math.min(100, Math.max(1, opts?.limit ?? 20));

    const where: any = {};
    if (opts?.id_salida !== undefined) where.id_salida = opts.id_salida;
    if (opts?.id_material !== undefined) where.id_material = opts.id_material;
    if (opts?.activo !== undefined) where.activo = opts.activo;

    const [data, total] = await this.repo.findAndCount({
      where,
      order: { id_detalle_salida: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total, page, limit };
  }

  async findOne(id_detalle_salida: number): Promise<DetalleSalida> {
    const det = await this.repo.findOne({ where: { id_detalle_salida } });
    if (!det) throw new NotFoundException(`Detalle ${id_detalle_salida} no existe`);
    return det;
  }

  async update(id_detalle_salida: number, dto: UpdateDetalleSalidaDto): Promise<DetalleSalida> {
    const det = await this.findOne(id_detalle_salida);
    if (dto.cantidad !== undefined && dto.cantidad <= 0) {
      throw new BadRequestException('cantidad debe ser > 0');
    }
    Object.assign(det, dto);
    return await this.repo.save(det);
  }

  async remove(id_detalle_salida: number): Promise<void> {
    const det = await this.findOne(id_detalle_salida);
    det.activo = false;
    await this.repo.save(det);
  }

  async restore(id_detalle_salida: number): Promise<DetalleSalida> {
    const det = await this.findOne(id_detalle_salida);
    det.activo = true;
    return await this.repo.save(det);
  }
}