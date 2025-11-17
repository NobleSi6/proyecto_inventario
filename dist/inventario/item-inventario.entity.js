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
exports.ItemInventario = void 0;
const typeorm_1 = require("typeorm");
let ItemInventario = class ItemInventario {
    id;
    sku;
    nombre;
    descripcion;
    unidadMedida;
    stockActual;
    costoUnitario;
    estado;
    ubicacionInterna;
};
exports.ItemInventario = ItemInventario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ItemInventario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, unique: true }),
    __metadata("design:type", String)
], ItemInventario.prototype, "sku", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], ItemInventario.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ItemInventario.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], ItemInventario.prototype, "unidadMedida", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2, default: 0.00 }),
    __metadata("design:type", Number)
], ItemInventario.prototype, "stockActual", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2, default: 0.00 }),
    __metadata("design:type", Number)
], ItemInventario.prototype, "costoUnitario", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, default: 'NUEVO' }),
    __metadata("design:type", String)
], ItemInventario.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, nullable: true }),
    __metadata("design:type", String)
], ItemInventario.prototype, "ubicacionInterna", void 0);
exports.ItemInventario = ItemInventario = __decorate([
    (0, typeorm_1.Entity)('items_inventario')
], ItemInventario);
//# sourceMappingURL=item-inventario.entity.js.map