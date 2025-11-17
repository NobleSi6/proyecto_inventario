"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetallesSalidaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const detalles_salida_service_1 = require("./detalles-salida.service");
const detalles_salida_controller_1 = require("./detalles-salida.controller");
const detalle_salida_entity_1 = require("./detalle-salida.entity");
let DetallesSalidaModule = class DetallesSalidaModule {
};
exports.DetallesSalidaModule = DetallesSalidaModule;
exports.DetallesSalidaModule = DetallesSalidaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([detalle_salida_entity_1.DetalleSalida])],
        controllers: [detalles_salida_controller_1.DetallesSalidaController],
        providers: [detalles_salida_service_1.DetallesSalidaService],
        exports: [typeorm_1.TypeOrmModule, detalles_salida_service_1.DetallesSalidaService],
    })
], DetallesSalidaModule);
//# sourceMappingURL=detalles-salida.module.js.map