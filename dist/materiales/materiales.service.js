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
exports.MaterialesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const material_entity_1 = require("./material.entity");
let MaterialesService = class MaterialesService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const dup = await this.repo.findOne({ where: { codigo: dto.codigo } });
        if (dup)
            throw new common_1.BadRequestException(`codigo '${dto.codigo}' ya existe`);
        const entity = this.repo.create({ ...dto, activo: dto.activo ?? true });
        return await this.repo.save(entity);
    }
    async findAll(opts) {
        const page = Math.max(1, opts?.page ?? 1);
        const limit = Math.min(100, Math.max(1, opts?.limit ?? 20));
        const qb = this.repo.createQueryBuilder('m');
        if (opts?.q) {
            qb.andWhere('(m.codigo ILIKE :q OR m.nombre ILIKE :q)', { q: `%${opts.q}%` });
        }
        if (opts?.id_categoria !== undefined)
            qb.andWhere('m.id_categoria = :idc', { idc: opts.id_categoria });
        if (opts?.id_unidad !== undefined)
            qb.andWhere('m.id_unidad = :idu', { idu: opts.id_unidad });
        if (opts?.precioMin !== undefined)
            qb.andWhere('m.precio_unitario >= :pmin', { pmin: opts.precioMin });
        if (opts?.precioMax !== undefined)
            qb.andWhere('m.precio_unitario <= :pmax', { pmax: opts.precioMax });
        if (opts?.activo !== undefined)
            qb.andWhere('m.activo = :act', { act: opts.activo });
        qb.orderBy('m.nombre', 'ASC')
            .addOrderBy('m.codigo', 'ASC')
            .skip((page - 1) * limit)
            .take(limit);
        const [data, total] = await qb.getManyAndCount();
        return { data, total, page, limit };
    }
    async findOne(id_material) {
        const mat = await this.repo.findOne({ where: { id_material } });
        if (!mat)
            throw new common_1.NotFoundException(`Material ${id_material} no existe`);
        return mat;
    }
    async update(id_material, dto) {
        const mat = await this.findOne(id_material);
        if (dto.codigo && dto.codigo !== mat.codigo) {
            const exists = await this.repo.findOne({ where: { codigo: dto.codigo } });
            if (exists)
                throw new common_1.BadRequestException(`codigo '${dto.codigo}' ya existe`);
        }
        Object.assign(mat, dto);
        return await this.repo.save(mat);
    }
    async remove(id_material) {
        const mat = await this.findOne(id_material);
        mat.activo = false;
        await this.repo.save(mat);
    }
    async restore(id_material) {
        const mat = await this.findOne(id_material);
        mat.activo = true;
        return await this.repo.save(mat);
    }
    async hardDelete(id_material) {
        const result = await this.repo.delete({ id_material });
        if (result.affected === 0)
            throw new common_1.NotFoundException(`Material ${id_material} no existe`);
    }
};
exports.MaterialesService = MaterialesService;
exports.MaterialesService = MaterialesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(material_entity_1.Material)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MaterialesService);
//# sourceMappingURL=materiales.service.js.map