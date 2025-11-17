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
exports.DetalleSalida = void 0;
const typeorm_1 = require("typeorm");
const decimalTransformer = {
    to: (value) => value,
    from: (value) => (value === null ? null : Number(value)),
};
let DetalleSalida = class DetalleSalida {
    id_detalle_salida;
    id_salida;
    id_material;
    cantidad;
    observaciones;
    activo;
};
exports.DetalleSalida = DetalleSalida;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_detalle_salida' }),
    __metadata("design:type", Number)
], DetalleSalida.prototype, "id_detalle_salida", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'id_salida', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], DetalleSalida.prototype, "id_salida", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'id_material', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], DetalleSalida.prototype, "id_material", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'cantidad',
        type: 'numeric',
        precision: 12,
        scale: 2,
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Number)
], DetalleSalida.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'observaciones', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], DetalleSalida.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activo', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], DetalleSalida.prototype, "activo", void 0);
exports.DetalleSalida = DetalleSalida = __decorate([
    (0, typeorm_1.Entity)({ name: 'detalle_salida' })
], DetalleSalida);
//# sourceMappingURL=detalle-salida.entity.js.map