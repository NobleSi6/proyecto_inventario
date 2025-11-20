"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferenciasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transferencia_entity_1 = require("./transferencia.entity");
let TransferenciasService = class TransferenciasService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const dup = await this.repo.findOne({ where: { numero_transferencia: dto.numero_transferencia } });
        if (dup)
            throw new common_1.BadRequestException(`numero_transferencia '${dto.numero_transferencia}' ya existe`);
        const entity = this.repo.create({ ...dto, activo: dto.activo ?? true });
        return await this.repo.save(entity);
    }
    async findAll(opts) {
        const page = Math.max(1, opts?.page ?? 1);
        const limit = Math.min(100, Math.max(1, opts?.limit ?? 20));
        const where = {};
        if (opts?.q)
            where.numero_transferencia = (0, typeorm_2.ILike)(`%${opts.q}%`);
        if (opts?.id_almacen_origen !== undefined)
            where.id_almacen_origen = opts.id_almacen_origen;
        if (opts?.id_almacen_destino !== undefined)
            where.id_almacen_destino = opts.id_almacen_destino;
        if (opts?.id_empleado_autoriza !== undefined)
            where.id_empleado_autoriza = opts.id_empleado_autoriza;
        if (opts?.id_empleado_solicitante !== undefined)
            where.id_empleado_solicitante = opts.id_empleado_solicitante;
        if (opts?.estado !== undefined)
            where.estado = opts.estado;
        if (opts?.activo !== undefined)
            where.activo = opts.activo;
        const qb = this.repo.createQueryBuilder('t').where(where);
        if (opts?.desde)
            qb.andWhere('t.fecha_transferencia >= :desde', { desde: opts.desde });
        if (opts?.hasta)
            qb.andWhere('t.fecha_transferencia <= :hasta', { hasta: opts.hasta });
        if (opts?.recibidaDesde)
            qb.andWhere('t.fecha_recepcion >= :rdesde', { rdesde: opts.recibidaDesde });
        if (opts?.recibidaHasta)
            qb.andWhere('t.fecha_recepcion <= :rhasta', { rhasta: opts.recibidaHasta });
        qb.orderBy('t.fecha_transferencia', 'DESC')
            .addOrderBy('t.id_transferencia', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        const [data, total] = await qb.getManyAndCount();
        return { data, total, page, limit };
    }
    async findOne(id_transferencia) {
        const t = await this.repo.findOne({ where: { id_transferencia } });
        if (!t)
            throw new common_1.NotFoundException(`Transferencia ${id_transferencia} no existe`);
        return t;
    }
    async update(id_transferencia, dto) {
        const t = await this.findOne(id_transferencia);
        if (dto.numero_transferencia && dto.numero_transferencia !== t.numero_transferencia) {
            const exists = await this.repo.findOne({ where: { numero_transferencia: dto.numero_transferencia } });
            if (exists)
                throw new common_1.BadRequestException(`numero_transferencia '${dto.numero_transferencia}' ya existe`);
        }
        Object.assign(t, dto);
        return await this.repo.save(t);
    }
    async remove(id_transferencia) {
        const t = await this.findOne(id_transferencia);
        t.activo = false;
        await this.repo.save(t);
    }
    async restore(id_transferencia) {
        const t = await this.findOne(id_transferencia);
        t.activo = true;
        return await this.repo.save(t);
    }
    async hardDelete(id_transferencia) {
        const result = await this.repo.delete({ id_transferencia });
        if (result.affected === 0)
            throw new common_1.NotFoundException(`Transferencia ${id_transferencia} no existe`);
    }
};
exports.TransferenciasService = TransferenciasService;
exports.TransferenciasService = TransferenciasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transferencia_entity_1.Transferencia)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TransferenciasService);
//# sourceMappingURL=transferencias.service.js.map