import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindOptions } from 'sequelize';

import { MOODS_REPOSITORY } from '../constants';
import Mood from '../models/mood.entity';
import { TMood } from '../types/mood';

@Injectable()
export class MoodsRepository {
  constructor(
    @Inject(MOODS_REPOSITORY) private readonly moodRepository: typeof Mood,
  ) {}

  public async create(mood: TMood): Promise<Mood> {
    try {
      return await this.moodRepository.create<Mood>(mood);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async update(id, mood: TMood): Promise<Mood> {
    try {
      const [, [updatedMood]] = await this.moodRepository.update<Mood>(mood, {
        where: { id },
        returning: true,
      });
      return updatedMood;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneById(id: number): Promise<Mood> {
    try {
      return await this.moodRepository.findOne<Mood>({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAll(filters: FindOptions): Promise<Mood[]> {
    try {
      return await this.moodRepository.findAll<Mood>(filters);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async delete(id: number): Promise<number> {
    try {
      return await this.moodRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
