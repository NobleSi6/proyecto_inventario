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
exports.HistorialMovimiento = void 0;
const typeorm_1 = require("typeorm");
const decimalTransformer = {
    to: (value) => value,
    from: (value) => (value === null ? null : Number(value)),
};
let HistorialMovimiento = class HistorialMovimiento {
    id_movimiento;
    id_material;
    id_almacen;
    tipo_movimiento;
    cantidad;
    stock_anterior;
    stock_nuevo;
    referencia;
    id_empleado;
    fecha_movimiento;
    observaciones;
    activo;
};
exports.HistorialMovimiento = HistorialMovimiento;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_movimiento' }),
    __metadata("design:type", Number)
], HistorialMovimiento.prototype, "id_movimiento", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'id_material', type: 'int' }),
    __metadata("design:type", Number)
], HistorialMovimiento.prototype, "id_material", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'id_almacen', type: 'int' }),
    __metadata("design:type", Number)
], HistorialMovimiento.prototype, "id_almacen", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tipo_movimiento', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], HistorialMovimiento.prototype, "tipo_movimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cantidad', type: 'numeric', precision: 12, scale: 2, transformer: decimalTransformer }),
    __metadata("design:type", Number)
], HistorialMovimiento.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stock_anterior', type: 'numeric', precision: 12, scale: 2, nullable: true, transformer: decimalTransformer }),
    __metadata("design:type", Object)
], HistorialMovimiento.prototype, "stock_anterior", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stock_nuevo', type: 'numeric', precision: 12, scale: 2, nullable: true, transformer: decimalTransformer }),
    __metadata("design:type", Object)
], HistorialMovimiento.prototype, "stock_nuevo", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'referencia', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], HistorialMovimiento.prototype, "referencia", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'id_empleado', type: 'int' }),
    __metadata("design:type", Number)
], HistorialMovimiento.prototype, "id_empleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_movimiento', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], HistorialMovimiento.prototype, "fecha_movimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'observaciones', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], HistorialMovimiento.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activo', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], HistorialMovimiento.prototype, "activo", void 0);
exports.HistorialMovimiento = HistorialMovimiento = __decorate([
    (0, typeorm_1.Entity)({ name: 'historial_movimientos' })
], HistorialMovimiento);
//# sourceMappingURL=historial-movimiento.entity.js.map