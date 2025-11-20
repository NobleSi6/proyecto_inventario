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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventarioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const item_inventario_entity_1 = require("./item-inventario.entity");
let InventarioService = class InventarioService {
    itemRepository;
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async create(createItemDto) {
        const existingItem = await this.itemRepository.findOne({ where: { sku: createItemDto.sku } });
        if (existingItem) {
            throw new common_1.BadRequestException(`El SKU ${createItemDto.sku} ya existe en el inventario.`);
        }
        const newItem = this.itemRepository.create({
            sku: createItemDto.sku,
            nombre: createItemDto.nombre,
            descripcion: createItemDto.descripcion,
            unidadMedida: createItemDto.unidadMedida,
            stockActual: createItemDto.cantidad,
            costoUnitario: createItemDto.costoUnitario || 0,
            estado: createItemDto.estado,
            ubicacionInterna: createItemDto.ubicacionInterna,
        });
        return this.itemRepository.save(newItem);
    }
    async findAll() {
        return this.itemRepository.find();
    }
    async findOne(id) {
        const item = await this.itemRepository.findOneBy({ id });
        if (!item) {
            throw new common_1.NotFoundException(`Ítem de Inventario con ID ${id} no encontrado.`);
        }
        return item;
    }
};
exports.InventarioService = InventarioService;
exports.InventarioService = InventarioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(item_inventario_entity_1.ItemInventario)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InventarioService);
//# sourceMappingURL=inventario.service.js.map