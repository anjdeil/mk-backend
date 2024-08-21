import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { MusicsRepository } from './musics.repository';
import { MUSIC_HISTORY_REPOSITORY } from '../constants';
import MusicsHistory from '../models/history.entity';
import Music from '../models/music.entity';
import User from '../models/user.entity';
import { TProcessedHistory } from '../types/history';

@Injectable()
export class MusicsHistoryRepository {
  constructor(
    @Inject(MUSIC_HISTORY_REPOSITORY)
    private readonly historyRepository: typeof MusicsHistory,
    private readonly musicRepository: MusicsRepository,
  ) {}

  public async create(musicId: number, userId: number): Promise<MusicsHistory> {
    try {
      const music = await this.musicRepository.findOneById(musicId);
      if (!music) {
        throw new Error('Music not found');
      }

      await this.musicRepository.incrementCounts('listenCount', musicId);
      return await this.historyRepository.create<MusicsHistory>({
        musicId,
        userId,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async update(musicId: number, userId: number): Promise<MusicsHistory> {
    try {
      const history = await this.historyRepository.update<MusicsHistory>(
        {},
        {
          where: { musicId, userId },
          returning: true,
        },
      )[1][0];
      return history;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAllByUser(userId: number): Promise<TProcessedHistory[]> {
    try {
      const history = await this.historyRepository.findAll<MusicsHistory>({
        where: { userId },
        include: [
          {
            model: Music,
            attributes: [
              'id',
              'title',
              'previewImage',
              'previewTrack',
              'artistId',
              'createdAt',
              'updatedAt',
            ],
            include: [{ model: User, attributes: ['name'], as: 'artist' }],
          },
        ],
      });

      const processedHistory = history.map((item) => ({
        id: item.music.id,
        title: item.music.title,
        previewImage: item.music.previewImage,
        previewTrack: item.music.previewTrack,
        artistName: item.music.artist.name,
        artistId: item.music.artistId,
        createdAt: item.music.createdAt,
        updatedAt: item.music.updatedAt,
      }));
      return processedHistory;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async delete(musicId: number, userId: number): Promise<void> {
    try {
      await this.historyRepository.destroy({ where: { musicId, userId } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
