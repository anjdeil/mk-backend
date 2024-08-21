import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindOptions } from 'sequelize';

import { KEYS_REPOSITORY } from '../constants';
import Key from '../models/key.entity';
import { TKey } from '../types/key';

@Injectable()
export class KeysRepository {
  constructor(
    @Inject(KEYS_REPOSITORY) private readonly keyRepository: typeof Key,
  ) {}

  public async create(key: TKey): Promise<Key> {
    try {
      return await this.keyRepository.create<Key>(key);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async update(id, key: TKey): Promise<Key> {
    try {
      const [, [updatedKey]] = await this.keyRepository.update<Key>(key, {
        where: { id },
        returning: true,
      });
      return updatedKey;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneById(id: number): Promise<Key> {
    try {
      return await this.keyRepository.findOne<Key>({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAll(filters: FindOptions): Promise<Key[]> {
    try {
      return await this.keyRepository.findAll<Key>(filters);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.keyRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
