import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { SETTINGS_REPOSITORY } from '../constants';
import User from '../models/user.entity';
import Settings from '../models/userSettings.entity';
import { TSettings } from '../types/settings';

@Injectable()
export class SettingsRepository {
  constructor(
    @Inject(SETTINGS_REPOSITORY)
    private readonly settingsRepository: typeof Settings,
  ) {}

  public async create(userId: number): Promise<Settings> {
    try {
      return await this.settingsRepository.create<Settings>({ userId });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneByUser(userId: number): Promise<Settings> {
    try {
      return await this.settingsRepository.findOne<Settings>({
        where: { userId },
        include: [User],
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async updateOneByUser(
    userId: number,
    data: Partial<TSettings>,
  ): Promise<Settings> {
    try {
      const [, [updatedSettings]] = await this.settingsRepository.update(data, {
        where: { userId },
        returning: true,
      });
      return updatedSettings;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
