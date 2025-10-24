import { Test, TestingModule } from '@nestjs/testing';
import { OrdenesCompraService } from './ordenes_compra.service';

describe('OrdenesCompraService', () => {
  let service: OrdenesCompraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdenesCompraService],
    }).compile();

    service = module.get<OrdenesCompraService>(OrdenesCompraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
