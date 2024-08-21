import { Test, TestingModule } from '@nestjs/testing';

import { HelpService } from './help.service';
import { HelpRequestRepository } from '../../core/repositories/help.repository';

describe('HelpService', () => {
  let service: HelpService;

  const mockHelpRepository = {
    createHelpRequest: jest.fn(),
    findHelpRequestById: jest.fn(),
    findAllHelpRequests: jest.fn(),
    deleteHelpRequest: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HelpService,
        { provide: HelpRequestRepository, useValue: mockHelpRepository },
      ],
    }).compile();

    service = module.get<HelpService>(HelpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
