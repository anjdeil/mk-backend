import { Test, TestingModule } from '@nestjs/testing';

import { FollowService } from './follows.service';
import { FollowRepository } from '../../core/repositories/follow.repository';

describe('FollowService', () => {
  let service: FollowService;
  let followRepository: FollowRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FollowService,
        {
          provide: FollowRepository,
          useValue: {
            follow: jest.fn(),
            unfollow: jest.fn(),
            countFollowers: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FollowService>(FollowService);
    followRepository = module.get<FollowRepository>(FollowRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
