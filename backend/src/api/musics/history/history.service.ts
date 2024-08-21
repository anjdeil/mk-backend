import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { MusicsHistory } from '../../../core/models';
import { MusicsHistoryRepository } from '../../../core/repositories';
import { TProcessedHistory } from '../../../core/types';

@Injectable()
export class HistoryService {
  constructor(private readonly historyRepository: MusicsHistoryRepository) {}

  public async addToHistory(
    musicId: number,
    userId: number,
  ): Promise<MusicsHistory> {
    try {
      return await this.historyRepository.create(musicId, userId);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async getHistoryByUser(id: number): Promise<TProcessedHistory[]> {
    try {
      return await this.historyRepository.findAllByUser(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
