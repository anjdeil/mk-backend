import { Test, TestingModule } from '@nestjs/testing';

import { HelpController } from './help.controller';
import { HelpService } from './help.service';

describe('HelpController', () => {
  let controller: HelpController;

  const mockHelpService = {
    createHelpRequest: jest.fn(),
    findAllHelpRequests: jest.fn(),
    findHelpRequestById: jest.fn(),
    deleteHelpRequest: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HelpController],
      providers: [{ provide: HelpService, useValue: mockHelpService }],
    }).compile();

    controller = module.get<HelpController>(HelpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
