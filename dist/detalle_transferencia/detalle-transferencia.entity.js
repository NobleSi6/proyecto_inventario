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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetalleTransferencia = void 0;
const typeorm_1 = require("typeorm");
const decimalTransformer = {
    to: (value) => value,
    from: (value) => (value === null ? null : Number(value)),
};
let DetalleTransferencia = class DetalleTransferencia {
    id_detalle_transferencia;
    id_transferencia;
    id_material;
    cantidad;
    cantidad_recibida;
    observaciones;
    activo;
};
exports.DetalleTransferencia = DetalleTransferencia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_detalle_transferencia' }),
    __metadata("design:type", Number)
], DetalleTransferencia.prototype, "id_detalle_transferencia", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'id_transferencia', type: 'int' }),
    __metadata("design:type", Number)
], DetalleTransferencia.prototype, "id_transferencia", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'id_material', type: 'int' }),
    __metadata("design:type", Number)
], DetalleTransferencia.prototype, "id_material", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'cantidad',
        type: 'numeric',
        precision: 12,
        scale: 2,
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Number)
], DetalleTransferencia.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'cantidad_recibida',
        type: 'numeric',
        precision: 12,
        scale: 2,
        nullable: true,
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Object)
], DetalleTransferencia.prototype, "cantidad_recibida", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'observaciones', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], DetalleTransferencia.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activo', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], DetalleTransferencia.prototype, "activo", void 0);
exports.DetalleTransferencia = DetalleTransferencia = __decorate([
    (0, typeorm_1.Entity)({ name: 'detalle_transferencia' })
], DetalleTransferencia);
//# sourceMappingURL=detalle-transferencia.entity.js.map