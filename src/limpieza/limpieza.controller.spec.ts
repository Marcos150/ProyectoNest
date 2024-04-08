import { Test, TestingModule } from '@nestjs/testing';
import { LimpiezaController } from './limpieza.controller';
import { LimpiezaService } from './limpieza.service';

describe('LimpiezaController', () => {
  let controller: LimpiezaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LimpiezaController],
      providers: [LimpiezaService],
    }).compile();

    controller = module.get<LimpiezaController>(LimpiezaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
