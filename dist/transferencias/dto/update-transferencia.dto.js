"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTransferenciaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_transferencia_dto_1 = require("./create-transferencia.dto");
class UpdateTransferenciaDto extends (0, mapped_types_1.PartialType)(create_transferencia_dto_1.CreateTransferenciaDto) {
}
exports.UpdateTransferenciaDto = UpdateTransferenciaDto;
//# sourceMappingURL=update-transferencia.dto.js.map