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
exports.Salida = void 0;
const typeorm_1 = require("typeorm");
let Salida = class Salida {
    id_salida;
    numero_salida;
    id_almacen;
    id_proyecto;
    id_empleado_autoriza;
    id_empleado_retira;
    fecha_salida;
    tipo_salida;
    observaciones;
    fecha_creacion;
    activo;
};
exports.Salida = Salida;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_salida' }),
    __metadata("design:type", Number)
], Salida.prototype, "id_salida", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ name: 'numero_salida', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Salida.prototype, "numero_salida", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_almacen', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Salida.prototype, "id_almacen", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_proyecto', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Salida.prototype, "id_proyecto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_empleado_autoriza', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Salida.prototype, "id_empleado_autoriza", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_empleado_retira', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Salida.prototype, "id_empleado_retira", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_salida', type: 'date', default: () => 'CURRENT_DATE' }),
    __metadata("design:type", String)
], Salida.prototype, "fecha_salida", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tipo_salida', type: 'varchar', length: 50, default: 'uso en proyecto', nullable: true }),
    __metadata("design:type", Object)
], Salida.prototype, "tipo_salida", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'observaciones', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Salida.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_creacion', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Salida.prototype, "fecha_creacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activo', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Salida.prototype, "activo", void 0);
exports.Salida = Salida = __decorate([
    (0, typeorm_1.Entity)({ name: 'salidas_inventario' })
], Salida);
//# sourceMappingURL=salida.entity.js.map