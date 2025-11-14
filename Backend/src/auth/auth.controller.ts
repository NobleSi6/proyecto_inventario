import { 
  Controller, 
  Post, 
  Body, 
  HttpCode, 
  HttpStatus,
  Get,
  Patch,
  Delete,
  UseGuards, // Para proteger los endpoints
  Req, // Para obtener el objeto de la solicitud (y el usuario autenticado)
  Param, // Para DELETE físico por ID (opcionalmente)
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
// Necesitarás un DTO para actualizar los datos del usuario
import { UpdateUserDto } from './dto/update-user.dto'; 
// Asume que tienes un JwtAuthGuard configurado
// import { JwtAuthGuard } from './guards/jwt-auth.guard'; 


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    // -----------------------------------------------------------------
    // ENDPOINTS DE AUTENTICACIÓN
    // -----------------------------------------------------------------

    @Post('register') // POST /auth/register
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }


    @Post('login') // POST /auth/login
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    // -----------------------------------------------------------------
    // ENDPOINTS CRUD DEL USUARIO AUTENTICADO (ASUMIENDO JWT GUARD)
    // -----------------------------------------------------------------

    // @UseGuards(JwtAuthGuard) // <--- Descomentar al implementar autenticación
    @Get('me') // GET /auth/me - Obtener información del usuario actual
    @HttpCode(HttpStatus.OK)
    async getProfile(@Req() req: any) {
      // Nota: En una app real, el guard adjuntaría el objeto usuario al request.
      // return this.authService.findUserById(req.user.id); 
      // Usaremos un placeholder:
      return { message: "Datos del usuario autenticado", userId: 1, user: req.user };
    }


    @Patch('update') // PATCH /auth/update - Actualización de datos (PATCH)
    // @UseGuards(JwtAuthGuard) // <--- Descomentar al implementar autenticación
    @HttpCode(HttpStatus.OK)
    async updateProfile(
        @Req() req: any, 
        @Body() updateUserDto: UpdateUserDto
    ) {
      // return this.authService.update(req.user.id, updateUserDto);
      // Usaremos un placeholder:
      return { 
        message: "Perfil actualizado exitosamente (PATCH)", 
        userId: 1, 
        changes: updateUserDto
      };
    }
    
    // -----------------------------------------------------------------
    // ELIMINACIÓN (DELETE)
    // -----------------------------------------------------------------

    // 1. DELETE LÓGICO (Recomendado para usuarios)
    @Delete('deactivate') // DELETE /auth/deactivate
    // @UseGuards(JwtAuthGuard) // <--- Descomentar al implementar autenticación
    @HttpCode(HttpStatus.OK)
    async deleteLogic(@Req() req: any) {
      // return this.authService.deleteLogic(req.user.id); // Simplemente actualiza el campo 'activo' a false
      return { message: "Usuario desactivado (Eliminación Lógica)", userId: 1 };
    }

    // 2. DELETE FÍSICO (Opcional, si se necesita borrar completamente el registro)
    // @Delete('permanently/:id') // DELETE /auth/permanently/:id
    // @UseGuards(AdminGuard) // <--- Solo para administradores
    // @HttpCode(HttpStatus.NO_CONTENT) // Código 204: no content
    // async deletePhysical(@Param('id') id: string) {
    //   // return this.authService.deletePhysical(+id); 
    //   return { message: `Usuario con ID ${id} eliminado permanentemente (Física)` };
    // }

}