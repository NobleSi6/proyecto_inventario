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
exports.AlmacenesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const almacen_entity_1 = require("./almacen.entity");
let AlmacenesService = class AlmacenesService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        if (dto.codigo) {
            const dup = await this.repo.findOne({ where: { codigo: dto.codigo } });
            if (dup)
                throw new common_1.BadRequestException(`codigo '${dto.codigo}' ya existe`);
        }
        const entity = this.repo.create({ ...dto, activo: dto.activo ?? true });
        return await this.repo.save(entity);
    }
    async findAll(opts) {
        const page = Math.max(1, opts?.page ?? 1);
        const limit = Math.min(100, Math.max(1, opts?.limit ?? 20));
        const qb = this.repo.createQueryBuilder('a');
        if (opts?.q) {
            qb.andWhere('(a.nombre ILIKE :q OR a.codigo ILIKE :q)', { q: `%${opts.q}%` });
        }
        if (opts?.ciudad !== undefined)
            qb.andWhere('a.ciudad = :cd', { cd: opts.ciudad });
        if (opts?.responsable !== undefined)
            qb.andWhere('a.responsable = :resp', { resp: opts.responsable });
        if (opts?.activo !== undefined)
            qb.andWhere('a.activo = :act', { act: opts.activo });
        qb.orderBy('a.nombre', 'ASC')
            .addOrderBy('a.id_almacen', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        const [data, total] = await qb.getManyAndCount();
        return { data, total, page, limit };
    }
    async findOne(id_almacen) {
        const al = await this.repo.findOne({ where: { id_almacen } });
        if (!al)
            throw new common_1.NotFoundException(`Almacén ${id_almacen} no existe`);
        return al;
    }
    async update(id_almacen, dto) {
        const al = await this.findOne(id_almacen);
        if (dto.codigo && dto.codigo !== al.codigo) {
            const exists = await this.repo.findOne({ where: { codigo: dto.codigo } });
            if (exists)
                throw new common_1.BadRequestException(`codigo '${dto.codigo}' ya existe`);
        }
        Object.assign(al, dto);
        return await this.repo.save(al);
    }
    async remove(id_almacen) {
        const al = await this.findOne(id_almacen);
        al.activo = false;
        await this.repo.save(al);
    }
    async restore(id_almacen) {
        const al = await this.findOne(id_almacen);
        al.activo = true;
        return await this.repo.save(al);
    }
    async hardDelete(id_almacen) {
        const result = await this.repo.delete({ id_almacen });
        if (result.affected === 0)
            throw new common_1.NotFoundException(`Almacén ${id_almacen} no existe`);
    }
};
exports.AlmacenesService = AlmacenesService;
exports.AlmacenesService = AlmacenesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(almacen_entity_1.Almacen)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AlmacenesService);
//# sourceMappingURL=almacenes.service.js.map