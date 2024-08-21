import { Test, TestingModule } from '@nestjs/testing';

import { PlaylistFollowService } from './playlist-follow.service';
import { PlaylistsRepository } from '../../core/repositories';

describe('PlaylistService', () => {
  let service: PlaylistFollowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistFollowService,
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

    service = module.get<PlaylistFollowService>(PlaylistFollowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
