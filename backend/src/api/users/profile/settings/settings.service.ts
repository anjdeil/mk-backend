import { Injectable } from '@nestjs/common';

import { Settings } from '../../../../core/models';
import { SettingsRepository } from '../../../../core/repositories';
import { TSettings } from '../../../../core/types';

@Injectable()
export class SettingsService {
  constructor(private readonly settingsRepository: SettingsRepository) {}

  public async update(
    userId: number,
    data: Omit<TSettings, 'userId'>,
  ): Promise<any> {
    return await this.settingsRepository.updateOneByUser(userId, data);
  }

  public async findOneByUser(userId: number): Promise<Settings> {
    return await this.settingsRepository.findOneByUser(userId);
  }
}
