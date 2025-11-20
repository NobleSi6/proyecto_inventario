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
exports.DetalleOrdenCompra = void 0;
const typeorm_1 = require("typeorm");
let DetalleOrdenCompra = class DetalleOrdenCompra {
    id_detalle;
    id_orden_compra;
    id_material;
    cantidad;
    precio_unitario;
    subtotal;
    observaciones;
    activo;
};
exports.DetalleOrdenCompra = DetalleOrdenCompra;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DetalleOrdenCompra.prototype, "id_detalle", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DetalleOrdenCompra.prototype, "id_orden_compra", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DetalleOrdenCompra.prototype, "id_material", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric' }),
    __metadata("design:type", Number)
], DetalleOrdenCompra.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric' }),
    __metadata("design:type", Number)
], DetalleOrdenCompra.prototype, "precio_unitario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric' }),
    __metadata("design:type", Number)
], DetalleOrdenCompra.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], DetalleOrdenCompra.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], DetalleOrdenCompra.prototype, "activo", void 0);
exports.DetalleOrdenCompra = DetalleOrdenCompra = __decorate([
    (0, typeorm_1.Entity)('detalle_orden_compra')
], DetalleOrdenCompra);
//# sourceMappingURL=detalle_orden_compra.entity.js.map