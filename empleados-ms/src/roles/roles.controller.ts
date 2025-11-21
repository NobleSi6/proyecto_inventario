import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RolesService } from './roles.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern({ cmd: 'roles_listar' })
  listar() {
    return this.rolesService.findAll();
  }

  @MessagePattern({ cmd: 'rol_buscar' })
  buscar(@Payload() id: number) {
    return this.rolesService.findOne(id);
  }

  @MessagePattern({ cmd: 'rol_crear' })
  crear(@Payload() payload: CreateRolDto) {
    return this.rolesService.create(payload);
  }

  @MessagePattern({ cmd: 'rol_actualizar' })
  actualizar(@Payload() data: { id: number; dto: UpdateRolDto }) {
    const { id, dto } = data;
    return this.rolesService.update(id, dto);
  }

  @MessagePattern({ cmd: 'rol_eliminar' })
  eliminar(@Payload() id: number) {
    return this.rolesService.delete(id);
  }
}
