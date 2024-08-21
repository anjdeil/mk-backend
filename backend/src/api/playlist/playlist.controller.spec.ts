import { Test, TestingModule } from '@nestjs/testing';

import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';

describe('PlaylistController', () => {
  let controller: PlaylistController;
  let service: PlaylistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistController],
      providers: [
        {
          provide: PlaylistService,
          useValue: {
            createPlaylist: jest.fn(),
            updatePlaylist: jest.fn(),
            deletePlaylist: jest.fn(),
            getAllPublicPlaylists: jest.fn(),
            addOrUpdatePlaylistCover: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PlaylistController>(PlaylistController);
    service = module.get<PlaylistService>(PlaylistService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
