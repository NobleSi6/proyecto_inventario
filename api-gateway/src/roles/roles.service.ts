import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RolesService {
  constructor(
    @Inject('USUARIOS_SERVICE') private readonly client: ClientProxy,
  ) {}

  // Crear un rol enviando mensaje al microservicio
  async crearRol(payload: { tipo_cargo: string }) {
    return lastValueFrom(this.client.send({ cmd: 'rol_crear' }, payload));
  }

  // Obtener roles desde el microservicio
  async obtenerRoles() {
    return lastValueFrom(this.client.send({ cmd: 'rol_listar' }, {}));
  }
}
