"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const usuario_entity_1 = require("../usuarios/usuario.entity");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    usuariosRepository;
    jwtService;
    constructor(usuariosRepository, jwtService) {
        this.usuariosRepository = usuariosRepository;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const existingUser = await this.usuariosRepository.findOne({ where: { email: registerDto.email } });
        if (existingUser) {
            throw new common_1.ConflictException('El email ya esta registrado');
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(registerDto.password, salt);
        const nuevoUsuario = this.usuariosRepository.create({
            nombre: registerDto.nombre,
            apellido: registerDto.apellido,
            email: registerDto.email,
            telefono: registerDto.telefono,
            passwordHash: passwordHash,
            idRol: registerDto.idRol,
            activo: true,
        });
        const userSaved = await this.usuariosRepository.save(nuevoUsuario);
        const userResult = await this.usuariosRepository.findOne({
            where: { id: userSaved.id },
            select: [
                'id',
                'nombre',
                'apellido',
                'email',
                'telefono',
                'rol',
                'activo',
                'fechaCreacion'
            ]
        });
        return userResult;
    }
    async validateUser(email, pass) {
        const usuario = await this.usuariosRepository.findOne({ where: { email: email } });
        if (!usuario || !usuario.activo) {
            throw new common_1.NotFoundException('Usuario o contraseña incorrectos.');
        }
        const isMatch = await bcrypt.compare(pass, usuario.passwordHash);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Usuario o contraseña incorrectos.');
        }
        const { passwordHash, ...result } = usuario;
        return result;
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        const payload = {
            email: user.email,
            sub: user.id,
            rol: user.rol
        };
        return {
            access_token: this.jwtService.sign(payload),
            usuario: {
                id: user.id,
                nombre: user.nombre,
                rol: user.rol,
            }
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map