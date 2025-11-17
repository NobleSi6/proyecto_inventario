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
exports.HistorialMovimientosController = void 0;
const common_1 = require("@nestjs/common");
const historial_movimientos_service_1 = require("./historial-movimientos.service");
const create_historial_movimiento_dto_1 = require("./dto/create-historial-movimiento.dto");
const update_historial_movimiento_dto_1 = require("./dto/update-historial-movimiento.dto");
let HistorialMovimientosController = class HistorialMovimientosController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findAll(q, tipo, id_material, id_almacen, id_empleado, desde, hasta, activo, page = '1', limit = '20') {
        return this.service.findAll({
            q,
            tipo,
            id_material: id_material ? Number(id_material) : undefined,
            id_almacen: id_almacen ? Number(id_almacen) : undefined,
            id_empleado: id_empleado ? Number(id_empleado) : undefined,
            desde,
            hasta,
            activo: typeof activo === 'string' ? activo === 'true' : undefined,
            page: Number(page),
            limit: Number(limit),
        });
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    hardDelete(id) {
        return this.service.hardDelete(id);
    }
    remove(id) {
        return this.service.remove(id);
    }
    restore(id) {
        return this.service.restore(id);
    }
};
exports.HistorialMovimientosController = HistorialMovimientosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_historial_movimiento_dto_1.CreateHistorialMovimientoDto]),
    __metadata("design:returntype", void 0)
], HistorialMovimientosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('tipo')),
    __param(2, (0, common_1.Query)('id_material')),
    __param(3, (0, common_1.Query)('id_almacen')),
    __param(4, (0, common_1.Query)('id_empleado')),
    __param(5, (0, common_1.Query)('desde')),
    __param(6, (0, common_1.Query)('hasta')),
    __param(7, (0, common_1.Query)('activo')),
    __param(8, (0, common_1.Query)('page')),
    __param(9, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], HistorialMovimientosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HistorialMovimientosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_historial_movimiento_dto_1.UpdateHistorialMovimientoDto]),
    __metadata("design:returntype", void 0)
], HistorialMovimientosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id/def'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HistorialMovimientosController.prototype, "hardDelete", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HistorialMovimientosController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/restore'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HistorialMovimientosController.prototype, "restore", null);
exports.HistorialMovimientosController = HistorialMovimientosController = __decorate([
    (0, common_1.Controller)('historial-movimientos'),
    __metadata("design:paramtypes", [historial_movimientos_service_1.HistorialMovimientosService])
], HistorialMovimientosController);
//# sourceMappingURL=historial-movimientos.controller.js.map