import { Test, TestingModule } from '@nestjs/testing';

import { PlaylistFollowController } from './playlist-follow.controller';
import { PlaylistFollowService } from './playlist-follow.service';

describe('PlaylistFollowController', () => {
  let controller: PlaylistFollowController;
  let service: PlaylistFollowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistFollowController],
      providers: [
        {
          provide: PlaylistFollowService,
          useValue: {
            followPlaylist: jest.fn(),
            unfollowPlaylist: jest.fn(),
            getPlaylistFollowers: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PlaylistFollowController>(PlaylistFollowController);
    service = module.get<PlaylistFollowService>(PlaylistFollowService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
