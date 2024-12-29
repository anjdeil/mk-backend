import { Injectable } from '@nestjs/common';

import { NotificationMessages } from '../../../core/constants/notifications';
import { SearchFiltersDto } from '../../../core/dto';
import { NotificationType } from '../../../core/enums';
import { Playlist } from '../../../core/models';
import {
  NotificationsRepository,
  PlaylistsRepository,
  UsersRepository,
} from '../../../core/repositories';
import { PlaylistFollowRepository } from '../../../core/repositories/playlistFollow.repository';

@Injectable()
export class PlaylistFollowService {
  constructor(
    private readonly playlistFollowRepository: PlaylistFollowRepository,
    private readonly playlistsRepository: PlaylistsRepository,
    private readonly notificationRepository: NotificationsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async followPlaylist(userId: number, playlistId: number): Promise<void> {
    await this.playlistFollowRepository.followPlaylist(userId, playlistId);
    const playlist = await this.playlistsRepository.findOneById(playlistId);
    const user = await this.usersRepository.findOneById(userId);
    if (user && playlist) {
      await this.notificationRepository.create({
        type: NotificationType.NEW_PLAYLISTS_FOLLOWER,
        userId: playlist.ownerId,
        message: NotificationMessages.NEW_PLAYLISTS_FOLLOWER({
          name: user.name,
          avatarUrl: user.avatar || '',
        }),
        link: `/playlists/${playlistId}`,
      });
    }
  }

  async unfollowPlaylist(userId: number, playlistId: number): Promise<void> {
    await this.playlistFollowRepository.unfollowPlaylist(userId, playlistId);
  }

  async getPlaylistFollowers(playlistId: number): Promise<number[]> {
    return await this.playlistFollowRepository.getPlaylistFollowers(playlistId);
  }

  async getFollowedPlaylists(
    userId: number,
    options: SearchFiltersDto,
  ): Promise<{ playlists: Playlist[]; count: number }> {
    const { offset, limit } = options;
    return await this.playlistFollowRepository.getFollowedPlaylists(
      userId,
      +offset,
      +limit,
    );
  }
}
