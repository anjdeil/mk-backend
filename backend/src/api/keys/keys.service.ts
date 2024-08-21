import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FindOptions } from 'sequelize';

import { Key } from '../../core/models';
import { KeysRepository } from '../../core/repositories';
import { TKey } from '../../core/types';

@Injectable()
export class KeysService {
  constructor(private readonly keysRepository: KeysRepository) {}

  public async create(key: TKey): Promise<Key> {
    try {
      return await this.keysRepository.create(key);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async update(id: number, key: TKey): Promise<Key> {
    try {
      return await this.keysRepository.update(id, key);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneById(id: number): Promise<Key> {
    try {
      return await this.keysRepository.findOneById(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAll(filters: FindOptions): Promise<Key[]> {
    try {
      return await this.keysRepository.findAll(filters);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      return await this.keysRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
