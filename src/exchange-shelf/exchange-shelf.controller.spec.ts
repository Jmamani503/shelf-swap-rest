import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeShelfController } from './exchange-shelf.controller';
import { ExchangeShelfService } from './exchange-shelf.service';

describe('ExchangeShelfController', () => {
  let controller: ExchangeShelfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangeShelfController],
      providers: [ExchangeShelfService],
    }).compile();

    controller = module.get<ExchangeShelfController>(ExchangeShelfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
