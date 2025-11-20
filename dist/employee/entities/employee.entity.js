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
exports.Employee = void 0;
const rol_entity_1 = require("../../roles/rol.entity");
const usuario_entity_1 = require("../../usuarios/usuario.entity");
const typeorm_1 = require("typeorm");
let Employee = class Employee {
    idEmpleado;
    codigo;
    nombres;
    apPaterno;
    apMaterno;
    ci;
    telefono;
    email;
    fechaContratacion;
    activo;
    usuario;
    rol;
    idUsuario;
    idRol;
    fechaRegistro;
};
exports.Employee = Employee;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_empleados' }),
    __metadata("design:type", Number)
], Employee.prototype, "idEmpleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'codigo', type: 'varchar', length: 50, nullable: false }),
    __metadata("design:type", String)
], Employee.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombres', type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], Employee.prototype, "nombres", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ap_paterno', type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], Employee.prototype, "apPaterno", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ap_materno', type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], Employee.prototype, "apMaterno", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ci', type: 'varchar', length: 20, nullable: false }),
    __metadata("design:type", String)
], Employee.prototype, "ci", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'telefono', type: 'varchar', length: 20, nullable: false }),
    __metadata("design:type", String)
], Employee.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', length: 100, nullable: false, unique: true }),
    __metadata("design:type", String)
], Employee.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_contratacion', type: 'date', nullable: false }),
    __metadata("design:type", Date)
], Employee.prototype, "fechaContratacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activo', type: 'boolean', default: true, nullable: false }),
    __metadata("design:type", Boolean)
], Employee.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'id_usuario' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Employee.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rol_entity_1.Rol),
    (0, typeorm_1.JoinColumn)({ name: 'id_rol' }),
    __metadata("design:type", rol_entity_1.Rol)
], Employee.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario_id', type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Employee.prototype, "idUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rol_id', type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Employee.prototype, "idRol", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_registro', type: 'timestamp', nullable: false }),
    __metadata("design:type", Date)
], Employee.prototype, "fechaRegistro", void 0);
exports.Employee = Employee = __decorate([
    (0, typeorm_1.Entity)('empleados')
], Employee);
//# sourceMappingURL=employee.entity.js.map