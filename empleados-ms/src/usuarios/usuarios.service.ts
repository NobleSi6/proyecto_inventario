import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './usuarios.entity';
import { Rol } from '../roles/roles.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repo: Repository<Usuario>,

    @InjectRepository(Rol)
    private readonly rolRepo: Repository<Rol>,
  ) {}

  // Crear usuario con rol asignado
  async create(data: CreateUsuarioDto): Promise<Usuario> {
    if (!data.username || !data.password || !data.id_cargo) {
      throw new BadRequestException('username, password y cargo son requeridos');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const rol = await this.rolRepo.findOne({ where: { id_cargo: data.id_cargo } });
    if (!rol) throw new NotFoundException('Rol no encontrado');

    const usuario = this.repo.create({
      username: data.username,
      password: hashedPassword,
      rol,
    });

    return this.repo.save(usuario);
  }

  // Listar todos los usuarios con sus roles
  async findAll(): Promise<Usuario[]> {
    return this.repo.find({ relations: ['rol'] });
  }

  // Buscar usuario por ID
  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.repo.findOne({ where: { id_usuario: id }, relations: ['rol'] });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  // Buscar usuario por username (para login)
  async findByUsername(username: string): Promise<Usuario | undefined> {
    const user = await this.repo.findOne({ where: { username }, relations: ['rol'] });
    return user ?? undefined;
  }

  // Actualizar usuario con rol y contraseña
  async update(id: number, data: UpdateUsuarioDto): Promise<Usuario> {
    if (!data) throw new BadRequestException('Datos para actualizar son requeridos');

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    if (data.id_cargo) {
      const rol = await this.rolRepo.findOne({ where: { id_cargo: data.id_cargo } });
      if (!rol) throw new NotFoundException('Rol no encontrado');
      data['rol'] = rol;
      delete data['cargo'];
    }

    const usuario = await this.repo.preload({ id_usuario: id, ...data });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    return this.repo.save(usuario);
  }

  // Eliminar usuario
  async remove(id: number): Promise<{ message: string }> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return { message: 'Usuario eliminado correctamente' };
  }
}
