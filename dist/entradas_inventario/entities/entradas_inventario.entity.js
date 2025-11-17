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
exports.EntradaInventario = void 0;
const typeorm_1 = require("typeorm");
let EntradaInventario = class EntradaInventario {
    id_entrada;
    numero_entrada;
    id_almacen;
    id_orden_compra;
    id_empleado_recibe;
    fecha_entrada;
    tipo_entrada;
    observaciones;
    fecha_creacion;
    activo;
};
exports.EntradaInventario = EntradaInventario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EntradaInventario.prototype, "id_entrada", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EntradaInventario.prototype, "numero_entrada", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EntradaInventario.prototype, "id_almacen", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EntradaInventario.prototype, "id_orden_compra", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EntradaInventario.prototype, "id_empleado_recibe", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], EntradaInventario.prototype, "fecha_entrada", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EntradaInventario.prototype, "tipo_entrada", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], EntradaInventario.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], EntradaInventario.prototype, "fecha_creacion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], EntradaInventario.prototype, "activo", void 0);
exports.EntradaInventario = EntradaInventario = __decorate([
    (0, typeorm_1.Entity)('entradas_inventario')
], EntradaInventario);
//# sourceMappingURL=entradas_inventario.entity.js.map