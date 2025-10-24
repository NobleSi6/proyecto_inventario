import { Test, TestingModule } from '@nestjs/testing';
import { EntradasInventarioService } from './entradas_inventario.service';

describe('EntradasInventarioService', () => {
  let service: EntradasInventarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntradasInventarioService],
    }).compile();

    service = module.get<EntradasInventarioService>(EntradasInventarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
