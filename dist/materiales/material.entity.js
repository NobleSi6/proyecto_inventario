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
exports.Material = void 0;
const typeorm_1 = require("typeorm");
const moneyTransformer = {
    to: (value) => value,
    from: (value) => (value === null ? null : Number(value)),
};
let Material = class Material {
    id_material;
    codigo;
    nombre;
    descripcion;
    id_categoria;
    id_unidad;
    precio_unitario;
    stock_minimo;
    stock_maximo;
    ubicacion_almacen;
    activo;
    fecha_creacion;
};
exports.Material = Material;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_material' }),
    __metadata("design:type", Number)
], Material.prototype, "id_material", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ name: 'codigo', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Material.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre', type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Material.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'descripcion', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Material.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'id_categoria', type: 'int' }),
    __metadata("design:type", Number)
], Material.prototype, "id_categoria", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'id_unidad', type: 'int' }),
    __metadata("design:type", Number)
], Material.prototype, "id_unidad", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'precio_unitario',
        type: 'numeric',
        precision: 12,
        scale: 2,
        nullable: true,
        transformer: moneyTransformer,
    }),
    __metadata("design:type", Object)
], Material.prototype, "precio_unitario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stock_minimo', type: 'int', default: 0, nullable: true }),
    __metadata("design:type", Object)
], Material.prototype, "stock_minimo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stock_maximo', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Material.prototype, "stock_maximo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ubicacion_almacen', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Material.prototype, "ubicacion_almacen", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activo', type: 'boolean', default: true, nullable: true }),
    __metadata("design:type", Object)
], Material.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_creacion', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true }),
    __metadata("design:type", Object)
], Material.prototype, "fecha_creacion", void 0);
exports.Material = Material = __decorate([
    (0, typeorm_1.Entity)({ name: 'materiales' })
], Material);
//# sourceMappingURL=material.entity.js.map