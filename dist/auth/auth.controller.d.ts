import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<import("../usuarios/usuario.entity").Usuario>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        usuario: {
            id: any;
            nombre: any;
            rol: any;
        };
    }>;
    getProfile(req: any): Promise<{
        message: string;
        userId: number;
        user: any;
    }>;
    updateProfile(req: any, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        userId: number;
        changes: UpdateUserDto;
    }>;
    deleteLogic(req: any): Promise<{
        message: string;
        userId: number;
    }>;
}
