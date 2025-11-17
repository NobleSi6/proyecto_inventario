"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistorialMovimientosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const historial_movimientos_service_1 = require("./historial-movimientos.service");
const historial_movimientos_controller_1 = require("./historial-movimientos.controller");
const historial_movimiento_entity_1 = require("./historial-movimiento.entity");
let HistorialMovimientosModule = class HistorialMovimientosModule {
};
exports.HistorialMovimientosModule = HistorialMovimientosModule;
exports.HistorialMovimientosModule = HistorialMovimientosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([historial_movimiento_entity_1.HistorialMovimiento])],
        controllers: [historial_movimientos_controller_1.HistorialMovimientosController],
        providers: [historial_movimientos_service_1.HistorialMovimientosService],
        exports: [typeorm_1.TypeOrmModule, historial_movimientos_service_1.HistorialMovimientosService],
    })
], HistorialMovimientosModule);
//# sourceMappingURL=historial-movimientos.module.js.map