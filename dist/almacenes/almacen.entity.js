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
exports.Almacen = void 0;
const typeorm_1 = require("typeorm");
const decimalTransformer = {
    to: (value) => value,
    from: (value) => (value === null ? null : Number(value)),
};
let Almacen = class Almacen {
    id_almacen;
    nombre;
    codigo;
    direccion;
    ciudad;
    telefono;
    capacidad_m3;
    activo;
    fecha_creacion;
    responsable;
};
exports.Almacen = Almacen;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_almacen' }),
    __metadata("design:type", Number)
], Almacen.prototype, "id_almacen", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre', type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], Almacen.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ name: 'codigo', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", Object)
], Almacen.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'direccion', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Almacen.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ciudad', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Almacen.prototype, "ciudad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'telefono', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], Almacen.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'capacidad_m3',
        type: 'numeric',
        precision: 10,
        scale: 2,
        nullable: true,
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Object)
], Almacen.prototype, "capacidad_m3", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activo', type: 'boolean', nullable: true, default: true }),
    __metadata("design:type", Object)
], Almacen.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_creacion', type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Object)
], Almacen.prototype, "fecha_creacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'responsable', type: 'int' }),
    __metadata("design:type", Number)
], Almacen.prototype, "responsable", void 0);
exports.Almacen = Almacen = __decorate([
    (0, typeorm_1.Entity)({ name: 'almacenes' })
], Almacen);
//# sourceMappingURL=almacen.entity.js.map