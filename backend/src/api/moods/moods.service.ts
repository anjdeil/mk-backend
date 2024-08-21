import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FindOptions } from 'sequelize';

import { Mood } from '../../core/models';
import { MoodsRepository } from '../../core/repositories';
import { TMood } from '../../core/types';

@Injectable()
export class MoodsService {
  constructor(private readonly moodsRepository: MoodsRepository) {}

  public async create(mood: TMood): Promise<Mood> {
    try {
      return await this.moodsRepository.create(mood);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async update(id: number, mood: TMood): Promise<Mood> {
    try {
      return await this.moodsRepository.update(id, mood);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneById(id: number): Promise<Mood> {
    try {
      return await this.moodsRepository.findOneById(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAll(filters: FindOptions): Promise<Mood[]> {
    try {
      return await this.moodsRepository.findAll(filters);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async delete(id: number): Promise<number> {
    try {
      return await this.moodsRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
