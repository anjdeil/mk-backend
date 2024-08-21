import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindOptions } from 'sequelize';

import { TRACK_TYPES_REPOSITORY } from '../constants';
import TrackType from '../models/trackType.entity';
import { TType } from '../types/type';

@Injectable()
export class TypesRepository {
  constructor(
    @Inject(TRACK_TYPES_REPOSITORY)
    private readonly typeRepository: typeof TrackType,
  ) {}

  public async create(type: TType): Promise<TrackType> {
    try {
      return await this.typeRepository.create<TrackType>(type);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async update(id, type: TType): Promise<TrackType> {
    try {
      const [, [updatedType]] = await this.typeRepository.update<TrackType>(
        type,
        {
          where: { id },
          returning: true,
        },
      );
      return updatedType;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneById(id: number): Promise<TrackType> {
    try {
      return await this.typeRepository.findOne<TrackType>({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAll(filters: FindOptions): Promise<TrackType[]> {
    try {
      return await this.typeRepository.findAll<TrackType>(filters);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.typeRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
