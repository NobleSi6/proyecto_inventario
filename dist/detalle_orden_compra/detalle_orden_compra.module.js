"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetalleOrdenCompraModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const detalle_orden_compra_service_1 = require("./detalle_orden_compra.service");
const detalle_orden_compra_controller_1 = require("./detalle_orden_compra.controller");
const detalle_orden_compra_entity_1 = require("./entities/detalle_orden_compra.entity");
let DetalleOrdenCompraModule = class DetalleOrdenCompraModule {
};
exports.DetalleOrdenCompraModule = DetalleOrdenCompraModule;
exports.DetalleOrdenCompraModule = DetalleOrdenCompraModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([detalle_orden_compra_entity_1.DetalleOrdenCompra]),
        ],
        controllers: [detalle_orden_compra_controller_1.DetalleOrdenCompraController],
        providers: [detalle_orden_compra_service_1.DetalleOrdenCompraService],
    })
], DetalleOrdenCompraModule);
//# sourceMappingURL=detalle_orden_compra.module.js.map