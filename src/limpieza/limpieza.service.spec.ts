import { Test, TestingModule } from '@nestjs/testing';
import { LimpiezaService } from './limpieza.service';

describe('LimpiezaService', () => {
  let service: LimpiezaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LimpiezaService],
    }).compile();

    service = module.get<LimpiezaService>(LimpiezaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
