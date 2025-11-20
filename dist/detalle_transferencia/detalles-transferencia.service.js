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
exports.DetallesTransferenciaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const detalle_transferencia_entity_1 = require("./detalle-transferencia.entity");
let DetallesTransferenciaService = class DetallesTransferenciaService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        if (dto.cantidad !== undefined && dto.cantidad <= 0) {
            throw new common_1.BadRequestException('cantidad debe ser > 0');
        }
        if (dto.cantidad_recibida !== undefined && dto.cantidad_recibida < 0) {
            throw new common_1.BadRequestException('cantidad_recibida no puede ser negativa');
        }
        const entity = this.repo.create({ ...dto, activo: dto.activo ?? true });
        return await this.repo.save(entity);
    }
    async createMany(payload) {
        const items = payload.items ?? [];
        if (!items.length)
            throw new common_1.BadRequestException('items vacío');
        for (const it of items) {
            if (it.cantidad === undefined || it.cantidad <= 0) {
                throw new common_1.BadRequestException('cada item debe tener cantidad > 0');
            }
            if (it.cantidad_recibida !== undefined && it.cantidad_recibida < 0) {
                throw new common_1.BadRequestException('cantidad_recibida no puede ser negativa');
            }
        }
        const entities = this.repo.create(items.map(i => ({ ...i, activo: i.activo ?? true })));
        return await this.repo.save(entities);
    }
    async findAll(opts) {
        const page = Math.max(1, opts?.page ?? 1);
        const limit = Math.min(100, Math.max(1, opts?.limit ?? 20));
        const where = {};
        if (opts?.id_transferencia !== undefined)
            where.id_transferencia = opts.id_transferencia;
        if (opts?.id_material !== undefined)
            where.id_material = opts.id_material;
        if (opts?.activo !== undefined)
            where.activo = opts.activo;
        const [data, total] = await this.repo.findAndCount({
            where,
            order: { id_detalle_transferencia: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        return { data, total, page, limit };
    }
    async findOne(id_detalle_transferencia) {
        const det = await this.repo.findOne({ where: { id_detalle_transferencia } });
        if (!det)
            throw new common_1.NotFoundException(`Detalle transferencia ${id_detalle_transferencia} no existe`);
        return det;
    }
    async update(id_detalle_transferencia, dto) {
        const det = await this.findOne(id_detalle_transferencia);
        if (dto.cantidad !== undefined && dto.cantidad <= 0) {
            throw new common_1.BadRequestException('cantidad debe ser > 0');
        }
        if (dto.cantidad_recibida !== undefined && dto.cantidad_recibida < 0) {
            throw new common_1.BadRequestException('cantidad_recibida no puede ser negativa');
        }
        Object.assign(det, dto);
        return await this.repo.save(det);
    }
    async remove(id_detalle_transferencia) {
        const det = await this.findOne(id_detalle_transferencia);
        det.activo = false;
        await this.repo.save(det);
    }
    async restore(id_detalle_transferencia) {
        const det = await this.findOne(id_detalle_transferencia);
        det.activo = true;
        return await this.repo.save(det);
    }
    async hardDelete(id_detalle_transferencia) {
        const result = await this.repo.delete({ id_detalle_transferencia });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Detalle transferencia ${id_detalle_transferencia} no existe`);
        }
    }
};
exports.DetallesTransferenciaService = DetallesTransferenciaService;
exports.DetallesTransferenciaService = DetallesTransferenciaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(detalle_transferencia_entity_1.DetalleTransferencia)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DetallesTransferenciaService);
//# sourceMappingURL=detalles-transferencia.service.js.map