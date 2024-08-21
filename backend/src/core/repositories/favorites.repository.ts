import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindOptions } from 'sequelize';

import { MUSIC_FAVORITES_REPOSITORY } from '../constants';
import { musicInclude } from '../constants/includes';
import MusicsFavorites from '../models/favorites.entity';
import Music from '../models/music.entity';

@Injectable()
export class MusicsFavoritesRepository {
  constructor(
    @Inject(MUSIC_FAVORITES_REPOSITORY)
    private readonly favoritesRepository: typeof MusicsFavorites,
  ) {}

  public async create(
    musicId: number,
    userId: number,
  ): Promise<MusicsFavorites> {
    try {
      return await this.favoritesRepository.create<MusicsFavorites>({
        musicId,
        userId,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOne(
    musicId: number,
    userId: number,
  ): Promise<MusicsFavorites> {
    try {
      return await this.favoritesRepository.findOne<MusicsFavorites>({
        where: { musicId, userId },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAllByUser(
    userId: number,
    filters: FindOptions = {},
  ): Promise<MusicsFavorites[]> {
    try {
      filters.where = { ...filters?.where, userId };
      filters.include = [{ model: Music, as: 'music', include: musicInclude }];
      return await this.favoritesRepository.findAll<MusicsFavorites>(filters);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async delete(musicId: number, userId: number): Promise<void> {
    try {
      await this.favoritesRepository.destroy({ where: { musicId, userId } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
