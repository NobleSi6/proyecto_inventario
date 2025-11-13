import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { Usuario } from 'src/usuarios/usuario.entity';
import { JwtService } from '@nestjs/jwt'; 
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Usuario)
        private usuariosRepository: Repository<Usuario>,
            private jwtService: JwtService, 
    ){}

    async register(registerDto:RegisterDto): Promise<Usuario>{
        
        // 1. Buscar por 'username' (Propiedad de la Entidad y del DTO)
        const existingUser = await this.usuariosRepository.findOne({where:{username:registerDto.username}});
        
        if(existingUser){
            throw new ConflictException('El nombre de usuario ya está registrado');
        }
        
        const salt = await bcrypt.genSalt();
        // 2. Mapeamos el hash al campo 'password' (Propiedad de la Entidad)
        const hashedPassword = await bcrypt.hash(registerDto.password, salt);

        // 3. Crear el usuario solo con los campos existentes
        const nuevoUsuario = this.usuariosRepository.create({
            username: registerDto.username,
            password: hashedPassword, // ✅ Campo 'password'
            idRol: registerDto.idRol ,
            idEmpleado: registerDto.idEmpleado, // ✅ Campo FK requerido
            activo: true,
            // Se eliminan: nombre, apellido, email, telefono, passwordHash
        });

    const userSaved = await this.usuariosRepository.save(nuevoUsuario);

    // 4. Buscar el usuario guardado, cargando relaciones
    const userResult = await this.usuariosRepository.findOne({
        where: { id: userSaved.id },
        relations: ['rol', 'empleado'], 
        select: [ // ✅ Solo campos existentes
            'id', 
            'username', 
            'idRol', 
            'idEmpleado',
            'activo', 
            'fechaCreacion'
        ]
    });
        
        // 5. Quitar la contraseña hasheada antes de devolver y manejar el posible null
        if (!userResult) {
             throw new NotFoundException('Error al recuperar el usuario registrado.');
        }

        const { password, ...result } = userResult; 
        return result as Usuario;
    }

  // ✅ Cambiamos el parámetro a 'username'
  async validateUser(username: string, pass: string): Promise<Usuario> { 
    // 1. Buscar por 'username'
    const usuario = await this.usuariosRepository.findOne({ where: { username: username } });
    
    // Si el usuario no existe o está inactivo
    if (!usuario || !usuario.activo) {
        throw new NotFoundException('Usuario o contraseña incorrectos.');
    }
    
    // 2. Comparar la contraseña contra 'usuario.password'
    const isMatch = await bcrypt.compare(pass, usuario.password); // ✅ Usamos usuario.password

    if (!isMatch) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos.');
    }

    // 3. Usamos destructuración para excluir el hash ('password')
    const { password, ...result } = usuario;
    return result as Usuario;
  }

async login(loginDto: LoginDto) {
    // 1. Usamos loginDto.username para validar
    const user = await this.validateUser(loginDto.username, loginDto.password); // ✅ loginDto.username
    
    // 2. Cargar las relaciones completas para el Payload
    const userWithRelations = await this.usuariosRepository.findOne({
        where: { id: user.id },
        relations: ['rol', 'empleado'], 
    });
    
    // 3. Protección contra null (aunque validateUser ya debería evitarlo)
    if (!userWithRelations) {
        throw new NotFoundException('Usuario no encontrado después de la validación.');
    }
    
    // Payload (datos que se codificarán en el token)
    const payload = { 
      username: userWithRelations.username, // ✅ Usamos username
      sub: userWithRelations.id, 
      rol: userWithRelations.idRol 
    };
    
    return {
      // Devolver el token JWT y los datos esenciales del usuario
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: userWithRelations.id,
        username: userWithRelations.username, // ✅ Usamos username
        rol: userWithRelations.idRol,
        idEmpleado: userWithRelations.idEmpleado, // ✅ Agregamos el idEmpleado
      }
    };
}
  
}