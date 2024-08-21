import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { NotificationMessages } from '../../../core/constants/notifications';
import { NotificationType } from '../../../core/enums';
import { MusicsFavorites } from '../../../core/models';
import {
  MusicsFavoritesRepository,
  MusicsRepository,
  NotificationsRepository,
} from '../../../core/repositories';
import { TUser } from '../../../core/types';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: MusicsFavoritesRepository,
    private readonly musicsRepository: MusicsRepository,
    private readonly notificationRepository: NotificationsRepository,
  ) {}

  public async addToFavorite(
    musicId: number,
    user: TUser,
  ): Promise<MusicsFavorites> {
    const music = await this.musicsRepository.findOneById(musicId);

    if (!music) {
      throw new BadRequestException('Music not found');
    }

    const favorite = await this.favoritesRepository.create(musicId, user.id);
    await this.notificationRepository.create({
      type: NotificationType.MUSIC_FAVORITES,
      userId: music.artistId,
      message: NotificationMessages.MUSIC_FAVORITES(music.title, user.name),
    });

    return favorite;
  }

  public async removeFromFavorite(id: number, userId: number): Promise<void> {
    try {
      return await this.favoritesRepository.delete(id, userId);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async getFavoritesByUser(id: number): Promise<MusicsFavorites[]> {
    try {
      return await this.favoritesRepository.findAllByUser(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
