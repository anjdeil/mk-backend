import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FindOptions } from 'sequelize';

import { TrackType } from '../../core/models';
import { TypesRepository } from '../../core/repositories';
import { TType } from '../../core/types';

@Injectable()
export class TypesService {
  constructor(private readonly typesRepository: TypesRepository) {}

  public async create(type: TType): Promise<TrackType> {
    try {
      return await this.typesRepository.create(type);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async update(id: number, type: TType): Promise<TrackType> {
    try {
      return await this.typesRepository.update(id, type);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneById(id: number): Promise<TrackType> {
    try {
      return await this.typesRepository.findOneById(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAll(filters: FindOptions): Promise<TrackType[]> {
    try {
      return await this.typesRepository.findAll(filters);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      return await this.typesRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
