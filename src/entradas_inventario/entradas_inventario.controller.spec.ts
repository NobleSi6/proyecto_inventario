import { Test, TestingModule } from '@nestjs/testing';
import { EntradasInventarioController } from './entradas_inventario.controller';
import { EntradasInventarioService } from './entradas_inventario.service';

describe('EntradasInventarioController', () => {
  let controller: EntradasInventarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntradasInventarioController],
      providers: [EntradasInventarioService],
    }).compile();

    controller = module.get<EntradasInventarioController>(EntradasInventarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
