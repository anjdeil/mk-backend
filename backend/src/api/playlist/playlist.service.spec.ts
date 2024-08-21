import { Test, TestingModule } from '@nestjs/testing';

import { PlaylistService } from './playlist.service';
import { PlaylistsRepository } from '../../core/repositories';

describe('PlaylistService', () => {
  let service: PlaylistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistService,
        {
          provide: PlaylistsRepository,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            addTrack: jest.fn(),
            removeTrack: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PlaylistService>(PlaylistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
