"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrdenesCompraDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_ordenes_compra_dto_1 = require("./create-ordenes_compra.dto");
class UpdateOrdenesCompraDto extends (0, mapped_types_1.PartialType)(create_ordenes_compra_dto_1.CreateOrdenCompraDto) {
}
exports.UpdateOrdenesCompraDto = UpdateOrdenesCompraDto;
//# sourceMappingURL=update-ordenes_compra.dto.js.map