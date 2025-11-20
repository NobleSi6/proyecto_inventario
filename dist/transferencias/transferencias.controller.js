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
exports.TransferenciasController = void 0;
const common_1 = require("@nestjs/common");
const transferencias_service_1 = require("./transferencias.service");
const create_transferencia_dto_1 = require("./dto/create-transferencia.dto");
const update_transferencia_dto_1 = require("./dto/update-transferencia.dto");
let TransferenciasController = class TransferenciasController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findAll(q, id_almacen_origen, id_almacen_destino, id_empleado_autoriza, id_empleado_solicitante, estado, desde, hasta, recibidaDesde, recibidaHasta, activo, page = '1', limit = '20') {
        return this.service.findAll({
            q,
            id_almacen_origen: id_almacen_origen ? Number(id_almacen_origen) : undefined,
            id_almacen_destino: id_almacen_destino ? Number(id_almacen_destino) : undefined,
            id_empleado_autoriza: id_empleado_autoriza ? Number(id_empleado_autoriza) : undefined,
            id_empleado_solicitante: id_empleado_solicitante ? Number(id_empleado_solicitante) : undefined,
            estado: estado ? Number(estado) : undefined,
            desde,
            hasta,
            recibidaDesde,
            recibidaHasta,
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
exports.TransferenciasController = TransferenciasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transferencia_dto_1.CreateTransferenciaDto]),
    __metadata("design:returntype", void 0)
], TransferenciasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('id_almacen_origen')),
    __param(2, (0, common_1.Query)('id_almacen_destino')),
    __param(3, (0, common_1.Query)('id_empleado_autoriza')),
    __param(4, (0, common_1.Query)('id_empleado_solicitante')),
    __param(5, (0, common_1.Query)('estado')),
    __param(6, (0, common_1.Query)('desde')),
    __param(7, (0, common_1.Query)('hasta')),
    __param(8, (0, common_1.Query)('recibidaDesde')),
    __param(9, (0, common_1.Query)('recibidaHasta')),
    __param(10, (0, common_1.Query)('activo')),
    __param(11, (0, common_1.Query)('page')),
    __param(12, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], TransferenciasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TransferenciasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_transferencia_dto_1.UpdateTransferenciaDto]),
    __metadata("design:returntype", void 0)
], TransferenciasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id/def'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TransferenciasController.prototype, "hardDelete", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TransferenciasController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/restore'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TransferenciasController.prototype, "restore", null);
exports.TransferenciasController = TransferenciasController = __decorate([
    (0, common_1.Controller)('transferencias'),
    __metadata("design:paramtypes", [transferencias_service_1.TransferenciasService])
], TransferenciasController);
//# sourceMappingURL=transferencias.controller.js.map