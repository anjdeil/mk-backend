import { Test, TestingModule } from '@nestjs/testing';

import { FollowsController } from './follows.controller';
import { FollowService } from './follows.service';

describe('FollowsController', () => {
  let controller: FollowsController;
  let followService: FollowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowsController],
      providers: [
        {
          provide: FollowService,
          useValue: {
            followUser: jest.fn(),
            unfollowUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FollowsController>(FollowsController);
    followService = module.get<FollowService>(FollowService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
