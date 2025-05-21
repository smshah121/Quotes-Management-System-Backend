import { Test, TestingModule } from '@nestjs/testing';
import { QuotesController } from './quote.controller';
import { QuotesService } from './quote.service';

describe('QuoteController', () => {
  let controller: QuotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuotesController],
      providers: [QuotesService],
    }).compile();

    controller = module.get<QuotesController>(QuotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
