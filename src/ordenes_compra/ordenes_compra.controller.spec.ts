import { Test, TestingModule } from '@nestjs/testing';
import { OrdenesCompraController } from './ordenes_compra.controller';
import { OrdenesCompraService } from './ordenes_compra.service';

describe('OrdenesCompraController', () => {
  let controller: OrdenesCompraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdenesCompraController],
      providers: [OrdenesCompraService],
    }).compile();

    controller = module.get<OrdenesCompraController>(OrdenesCompraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
