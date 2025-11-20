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
exports.StockAlmacen = void 0;
const typeorm_1 = require("typeorm");
const decimalTransformer = {
    to: (value) => value,
    from: (value) => (value === null ? null : Number(value)),
};
let StockAlmacen = class StockAlmacen {
    id_stock;
    id_material;
    id_almacen;
    cantidad_disponible;
    cantidad_reservada;
    ultima_actualizacion;
    activo;
};
exports.StockAlmacen = StockAlmacen;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_stock' }),
    __metadata("design:type", Number)
], StockAlmacen.prototype, "id_stock", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'id_material', type: 'int' }),
    __metadata("design:type", Number)
], StockAlmacen.prototype, "id_material", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'id_almacen', type: 'int' }),
    __metadata("design:type", Number)
], StockAlmacen.prototype, "id_almacen", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'cantidad_disponible',
        type: 'numeric',
        precision: 12,
        scale: 2,
        nullable: true,
        default: () => '0',
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Object)
], StockAlmacen.prototype, "cantidad_disponible", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'cantidad_reservada',
        type: 'numeric',
        precision: 12,
        scale: 2,
        nullable: true,
        default: () => '0',
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Object)
], StockAlmacen.prototype, "cantidad_reservada", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'ultima_actualizacion',
        type: 'timestamp',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Object)
], StockAlmacen.prototype, "ultima_actualizacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activo', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], StockAlmacen.prototype, "activo", void 0);
exports.StockAlmacen = StockAlmacen = __decorate([
    (0, typeorm_1.Entity)({ name: 'stock_almacen' }),
    (0, typeorm_1.Unique)('AK_6', ['id_material', 'id_almacen'])
], StockAlmacen);
//# sourceMappingURL=stock-almacen.entity.js.map