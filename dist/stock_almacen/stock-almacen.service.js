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
exports.StockAlmacenService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const stock_almacen_entity_1 = require("./stock-almacen.entity");
let StockAlmacenService = class StockAlmacenService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const dup = await this.repo.findOne({ where: { id_material: dto.id_material, id_almacen: dto.id_almacen } });
        if (dup) {
            throw new common_1.BadRequestException(`Ya existe stock para material ${dto.id_material} en almacén ${dto.id_almacen}`);
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
    async findAll(opts) {
        const page = Math.max(1, opts?.page ?? 1);
        const limit = Math.min(100, Math.max(1, opts?.limit ?? 20));
        const qb = this.repo.createQueryBuilder('s');
        if (opts?.id_material !== undefined)
            qb.andWhere('s.id_material = :idm', { idm: opts.id_material });
        if (opts?.id_almacen !== undefined)
            qb.andWhere('s.id_almacen = :ida', { ida: opts.id_almacen });
        if (opts?.activo !== undefined)
            qb.andWhere('s.activo = :act', { act: opts.activo });
        if (opts?.dispMin !== undefined)
            qb.andWhere('s.cantidad_disponible >= :dmin', { dmin: opts.dispMin });
        if (opts?.dispMax !== undefined)
            qb.andWhere('s.cantidad_disponible <= :dmax', { dmax: opts.dispMax });
        if (opts?.resMin !== undefined)
            qb.andWhere('s.cantidad_reservada >= :rmin', { rmin: opts.resMin });
        if (opts?.resMax !== undefined)
            qb.andWhere('s.cantidad_reservada <= :rmax', { rmax: opts.resMax });
        qb.orderBy('s.id_almacen', 'ASC')
            .addOrderBy('s.id_material', 'ASC')
            .skip((page - 1) * limit)
            .take(limit);
        const [data, total] = await qb.getManyAndCount();
        return { data, total, page, limit };
    }
    async findOne(id_stock) {
        const st = await this.repo.findOne({ where: { id_stock } });
        if (!st)
            throw new common_1.NotFoundException(`Stock ${id_stock} no existe`);
        return st;
    }
    async update(id_stock, dto) {
        const st = await this.findOne(id_stock);
        if ((dto.id_material && dto.id_material !== st.id_material) || (dto.id_almacen && dto.id_almacen !== st.id_almacen)) {
            const exists = await this.repo.findOne({
                where: {
                    id_material: dto.id_material ?? st.id_material,
                    id_almacen: dto.id_almacen ?? st.id_almacen,
                },
            });
            if (exists && exists.id_stock !== id_stock) {
                throw new common_1.BadRequestException(`Ya existe stock para material ${dto.id_material ?? st.id_material} en almacén ${dto.id_almacen ?? st.id_almacen}`);
            }
        }
        Object.assign(st, dto);
        st.ultima_actualizacion = new Date();
        return await this.repo.save(st);
    }
    async remove(id_stock) {
        const st = await this.findOne(id_stock);
        st.activo = false;
        st.ultima_actualizacion = new Date();
        await this.repo.save(st);
    }
    async restore(id_stock) {
        const st = await this.findOne(id_stock);
        st.activo = true;
        st.ultima_actualizacion = new Date();
        return await this.repo.save(st);
    }
    async hardDelete(id_stock) {
        const result = await this.repo.delete({ id_stock });
        if (result.affected === 0)
            throw new common_1.NotFoundException(`Stock ${id_stock} no existe`);
    }
};
exports.StockAlmacenService = StockAlmacenService;
exports.StockAlmacenService = StockAlmacenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(stock_almacen_entity_1.StockAlmacen)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StockAlmacenService);
//# sourceMappingURL=stock-almacen.service.js.map