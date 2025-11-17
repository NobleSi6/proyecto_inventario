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
exports.DetallesTransferenciaController = void 0;
const common_1 = require("@nestjs/common");
const detalles_transferencia_service_1 = require("./detalles-transferencia.service");
const create_detalle_transferencia_dto_1 = require("./dto/create-detalle-transferencia.dto");
const update_detalle_transferencia_dto_1 = require("./dto/update-detalle-transferencia.dto");
const create_many_detalles_transferencia_dto_1 = require("./dto/create-many-detalles-transferencia.dto");
let DetallesTransferenciaController = class DetallesTransferenciaController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    createMany(payload) {
        return this.service.createMany(payload);
    }
    findAll(id_transferencia, id_material, activo, page = '1', limit = '20') {
        return this.service.findAll({
            id_transferencia: id_transferencia ? Number(id_transferencia) : undefined,
            id_material: id_material ? Number(id_material) : undefined,
            activo: typeof activo === 'string' ? activo === 'true' : undefined,
            page: Number(page),
            limit: Number(limit),
        });
    }
    findOne(id) {
        return this.service.findOne(Number(id));
    }
    update(id, dto) {
        return this.service.update(Number(id), dto);
    }
    hardDelete(id) {
        return this.service.hardDelete(Number(id));
    }
    remove(id) {
        return this.service.remove(Number(id));
    }
    restore(id) {
        return this.service.restore(Number(id));
    }
};
exports.DetallesTransferenciaController = DetallesTransferenciaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_detalle_transferencia_dto_1.CreateDetalleTransferenciaDto]),
    __metadata("design:returntype", void 0)
], DetallesTransferenciaController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_many_detalles_transferencia_dto_1.CreateManyDetallesTransferenciaDto]),
    __metadata("design:returntype", void 0)
], DetallesTransferenciaController.prototype, "createMany", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('id_transferencia')),
    __param(1, (0, common_1.Query)('id_material')),
    __param(2, (0, common_1.Query)('activo')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], DetallesTransferenciaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DetallesTransferenciaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_detalle_transferencia_dto_1.UpdateDetalleTransferenciaDto]),
    __metadata("design:returntype", void 0)
], DetallesTransferenciaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id/def'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DetallesTransferenciaController.prototype, "hardDelete", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DetallesTransferenciaController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DetallesTransferenciaController.prototype, "restore", null);
exports.DetallesTransferenciaController = DetallesTransferenciaController = __decorate([
    (0, common_1.Controller)('detalles-transferencia'),
    __metadata("design:paramtypes", [detalles_transferencia_service_1.DetallesTransferenciaService])
], DetallesTransferenciaController);
//# sourceMappingURL=detalles-transferencia.controller.js.map