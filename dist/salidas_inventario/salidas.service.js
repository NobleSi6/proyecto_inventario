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
exports.SalidasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const salida_entity_1 = require("./salida.entity");
let SalidasService = class SalidasService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const dup = await this.repo.findOne({ where: { numero_salida: dto.numero_salida } });
        if (dup) {
            throw new common_1.BadRequestException(`numero_salida '${dto.numero_salida}' ya existe`);
        }
        const entity = this.repo.create({ ...dto, activo: dto.activo ?? true });
        return await this.repo.save(entity);
    }
    async findAll(opts) {
        const page = Math.max(1, opts?.page ?? 1);
        const limit = Math.min(100, Math.max(1, opts?.limit ?? 20));
        const where = {};
        if (opts?.q)
            where.numero_salida = (0, typeorm_2.ILike)(`%${opts.q}%`);
        if (opts?.id_almacen !== undefined)
            where.id_almacen = opts.id_almacen;
        if (opts?.id_proyecto !== undefined)
            where.id_proyecto = opts.id_proyecto;
        if (opts?.activo !== undefined)
            where.activo = opts.activo;
        const qb = this.repo.createQueryBuilder('s').where(where);
        if (opts?.desde)
            qb.andWhere('s.fecha_salida >= :desde', { desde: opts.desde });
        if (opts?.hasta)
            qb.andWhere('s.fecha_salida <= :hasta', { hasta: opts.hasta });
        qb.orderBy('s.fecha_salida', 'DESC')
            .addOrderBy('s.id_salida', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        const [data, total] = await qb.getManyAndCount();
        return { data, total, page, limit };
    }
    async findOne(id_salida) {
        const salida = await this.repo.findOne({ where: { id_salida } });
        if (!salida)
            throw new common_1.NotFoundException(`Salida ${id_salida} no existe`);
        return salida;
    }
    async update(id_salida, dto) {
        const salida = await this.findOne(id_salida);
        if (dto.numero_salida && dto.numero_salida !== salida.numero_salida) {
            const exists = await this.repo.findOne({ where: { numero_salida: dto.numero_salida } });
            if (exists)
                throw new common_1.BadRequestException(`numero_salida '${dto.numero_salida}' ya existe`);
        }
        Object.assign(salida, dto);
        return await this.repo.save(salida);
    }
    async remove(id_salida) {
        const salida = await this.findOne(id_salida);
        salida.activo = false;
        await this.repo.save(salida);
    }
    async restore(id_salida) {
        const salida = await this.findOne(id_salida);
        salida.activo = true;
        return await this.repo.save(salida);
    }
    async hardDelete(id_salida) {
        const result = await this.repo.delete({ id_salida });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Salida ${id_salida} no existe`);
        }
    }
};
exports.SalidasService = SalidasService;
exports.SalidasService = SalidasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(salida_entity_1.Salida)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SalidasService);
//# sourceMappingURL=salidas.service.js.map