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
exports.Transferencia = void 0;
const typeorm_1 = require("typeorm");
let Transferencia = class Transferencia {
    id_transferencia;
    numero_transferencia;
    id_almacen_origen;
    id_almacen_destino;
    id_empleado_autoriza;
    fecha_transferencia;
    fecha_recepcion;
    observaciones;
    fecha_creacion;
    estado;
    id_empleado_solicitante;
    activo;
};
exports.Transferencia = Transferencia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_transferencia' }),
    __metadata("design:type", Number)
], Transferencia.prototype, "id_transferencia", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ name: 'numero_transferencia', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Transferencia.prototype, "numero_transferencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_almacen_origen', type: 'int' }),
    __metadata("design:type", Number)
], Transferencia.prototype, "id_almacen_origen", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_almacen_destino', type: 'int' }),
    __metadata("design:type", Number)
], Transferencia.prototype, "id_almacen_destino", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_empleado_autoriza', type: 'int' }),
    __metadata("design:type", Number)
], Transferencia.prototype, "id_empleado_autoriza", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_transferencia', type: 'date', default: () => 'CURRENT_DATE' }),
    __metadata("design:type", String)
], Transferencia.prototype, "fecha_transferencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_recepcion', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Transferencia.prototype, "fecha_recepcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'observaciones', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Transferencia.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_creacion', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Transferencia.prototype, "fecha_creacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estado', type: 'int' }),
    __metadata("design:type", Number)
], Transferencia.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_empleado_solicitante', type: 'int' }),
    __metadata("design:type", Number)
], Transferencia.prototype, "id_empleado_solicitante", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activo', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Transferencia.prototype, "activo", void 0);
exports.Transferencia = Transferencia = __decorate([
    (0, typeorm_1.Entity)({ name: 'transferencias' })
], Transferencia);
//# sourceMappingURL=transferencia.entity.js.map