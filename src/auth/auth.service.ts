import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { Usuario } from 'src/usuarios/usuario.entity';
import { JwtService } from '@nestjs/jwt'; // 👈 Importar
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Usuario)
        private usuariosRepository: Repository<Usuario>,
            private jwtService: JwtService, //Inyectar JwtService
    ){}

    async register(registerDto:RegisterDto): Promise<Usuario>{
        const existingUser = await this.usuariosRepository.findOne({where:{email:registerDto.email}});
        if(existingUser){
            throw new ConflictException('El email ya esta registrado');
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
    }) as Usuario;
        return userResult;

    }

  async validateUser(email: string, pass: string): Promise<any> {
    const usuario = await this.usuariosRepository.findOne({ where: { email: email } });
    
    // Si el usuario no existe o está inactivo
    if (!usuario || !usuario.activo) {
        throw new NotFoundException('Usuario o contraseña incorrectos.');
    }
    
    // Comparar la contraseña ingresada con el hash guardado
    const isMatch = await bcrypt.compare(pass, usuario.passwordHash);

    if (!isMatch) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos.');
    }

    // Usamos destructuración para excluir el hash antes de devolver
    const { passwordHash, ...result } = usuario;
    return result;
  }

async login(loginDto: LoginDto) {
    // Usamos el validateUser para obtener el objeto Usuario sin el hash
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    // Payload (datos que se codificarán en el token)
    const payload = { 
      email: user.email, 
      sub: user.id, 
      rol: user.rol 
    };
    
    return {
      // Devolver el token JWT y los datos esenciales del usuario
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: user.id,
        nombre: user.nombre,
        rol: user.rol,
      }
    };

}
  
}
//comentario para hacer commit 🥶