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
exports.HistorialMovimientosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const historial_movimiento_entity_1 = require("./historial-movimiento.entity");
let HistorialMovimientosService = class HistorialMovimientosService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const entity = this.repo.create({ ...dto, activo: dto.activo ?? true });
        return await this.repo.save(entity);
    }
    async findAll(opts) {
        const page = Math.max(1, opts?.page ?? 1);
        const limit = Math.min(100, Math.max(1, opts?.limit ?? 20));
        const qb = this.repo.createQueryBuilder('h');
        if (opts?.q)
            qb.andWhere('h.referencia ILIKE :q', { q: `%${opts.q}%` });
        if (opts?.tipo)
            qb.andWhere('h.tipo_movimiento = :tp', { tp: opts.tipo });
        if (opts?.id_material !== undefined)
            qb.andWhere('h.id_material = :idm', { idm: opts.id_material });
        if (opts?.id_almacen !== undefined)
            qb.andWhere('h.id_almacen = :ida', { ida: opts.id_almacen });
        if (opts?.id_empleado !== undefined)
            qb.andWhere('h.id_empleado = :ide', { ide: opts.id_empleado });
        if (opts?.desde)
            qb.andWhere('h.fecha_movimiento >= :desde', { desde: opts.desde });
        if (opts?.hasta)
            qb.andWhere('h.fecha_movimiento <= :hasta', { hasta: opts.hasta });
        if (opts?.activo !== undefined)
            qb.andWhere('h.activo = :act', { act: opts.activo });
        qb.orderBy('h.fecha_movimiento', 'DESC')
            .addOrderBy('h.id_movimiento', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        const [data, total] = await qb.getManyAndCount();
        return { data, total, page, limit };
    }
    async findOne(id_movimiento) {
        const h = await this.repo.findOne({ where: { id_movimiento } });
        if (!h)
            throw new common_1.NotFoundException(`Movimiento ${id_movimiento} no existe`);
        return h;
    }
    async update(id_movimiento, dto) {
        const h = await this.findOne(id_movimiento);
        Object.assign(h, dto);
        return await this.repo.save(h);
    }
    async remove(id_movimiento) {
        const h = await this.findOne(id_movimiento);
        h.activo = false;
        await this.repo.save(h);
    }
    async restore(id_movimiento) {
        const h = await this.findOne(id_movimiento);
        h.activo = true;
        return await this.repo.save(h);
    }
    async hardDelete(id_movimiento) {
        const result = await this.repo.delete({ id_movimiento });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Movimiento ${id_movimiento} no existe`);
        }
    }
};
exports.HistorialMovimientosService = HistorialMovimientosService;
exports.HistorialMovimientosService = HistorialMovimientosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(historial_movimiento_entity_1.HistorialMovimiento)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HistorialMovimientosService);
//# sourceMappingURL=historial-movimientos.service.js.map