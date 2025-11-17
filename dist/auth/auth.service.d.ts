import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { Usuario } from 'src/usuarios/usuario.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private usuariosRepository;
    private jwtService;
    constructor(usuariosRepository: Repository<Usuario>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<Usuario>;
    validateUser(email: string, pass: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        usuario: {
            id: any;
            nombre: any;
            rol: any;
        };
    }>;
}
