import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeShelfService } from './exchange-shelf.service';

describe('ExchangeShelfService', () => {
  let service: ExchangeShelfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeShelfService],
    }).compile();

    service = module.get<ExchangeShelfService>(ExchangeShelfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
