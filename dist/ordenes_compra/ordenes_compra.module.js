"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdenesCompraModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ordenes_compra_service_1 = require("./ordenes_compra.service");
const ordenes_compra_controller_1 = require("./ordenes_compra.controller");
const ordenes_compra_entity_1 = require("./entities/ordenes_compra.entity");
let OrdenesCompraModule = class OrdenesCompraModule {
};
exports.OrdenesCompraModule = OrdenesCompraModule;
exports.OrdenesCompraModule = OrdenesCompraModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([ordenes_compra_entity_1.OrdenCompra]),
        ],
        controllers: [ordenes_compra_controller_1.OrdenesCompraController],
        providers: [ordenes_compra_service_1.OrdenesCompraService],
    })
], OrdenesCompraModule);
//# sourceMappingURL=ordenes_compra.module.js.map