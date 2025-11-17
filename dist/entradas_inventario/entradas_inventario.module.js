"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntradasInventarioModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entradas_inventario_service_1 = require("./entradas_inventario.service");
const entradas_inventario_controller_1 = require("./entradas_inventario.controller");
const entradas_inventario_entity_1 = require("./entities/entradas_inventario.entity");
let EntradasInventarioModule = class EntradasInventarioModule {
};
exports.EntradasInventarioModule = EntradasInventarioModule;
exports.EntradasInventarioModule = EntradasInventarioModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entradas_inventario_entity_1.EntradaInventario]),
        ],
        controllers: [entradas_inventario_controller_1.EntradasInventarioController],
        providers: [entradas_inventario_service_1.EntradasInventarioService],
    })
], EntradasInventarioModule);
//# sourceMappingURL=entradas_inventario.module.js.map