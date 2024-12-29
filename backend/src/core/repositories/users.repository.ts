import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindOptions, Op } from 'sequelize';

import { USER_REPOSITORY } from '../constants';
import { FollowRepository } from './follow.repository';
import { musicOrderFields, userOrderFields } from '../constants/search';
import { MusicStatus } from '../enums/musics';
import { Roles } from '../enums/roles';
import { getRelevanceTimeRange } from '../helpers/relevance.helper';
import { User } from '../models';
import Category from '../models/category.entity';
import MusicsHistory from '../models/history.entity';
import Instrument from '../models/instrument.entity';
import Key from '../models/key.entity';
import Mood from '../models/mood.entity';
import Music from '../models/music.entity';
import MusicFiles from '../models/musicFiles.entity';
import TrackType from '../models/trackType.entity';
import { TUser } from '../types/user';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    private readonly followRepository: FollowRepository,
  ) {}

  async connection(): Promise<any> {
    return this.userRepository.sequelize.authenticate();
  }

  public async create(data: TUser): Promise<User> {
    try {
      return await this.userRepository.create<User>(data, { raw: true });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async patch(id, data: Partial<TUser>): Promise<[number]> {
    try {
      return await this.userRepository.update<User>(data, { where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async update(id: number, data: Partial<TUser>): Promise<User> {
    try {
      const [, [result]] = await this.userRepository.update<User>(data, {
        where: { id },
        returning: true,
      });
      result.password = undefined;
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async updateUserSubsription(
    stripeId: string,
    data: Partial<TUser>,
  ): Promise<void> {
    try {
      const user = await this.findOneByStripeId(stripeId);
      if (!user) {
        throw new InternalServerErrorException('User not found');
      }

      await user.update(data);
      return;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne<User>({ where: { email } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneByStripeId(stripeId: string): Promise<User> {
    try {
      return await this.userRepository.findOne<User>({ where: { stripeId } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneById(
    id: number,
    options: FindOptions = {},
  ): Promise<User> {
    try {
      return await this.userRepository.findOne<User>({
        ...options,
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAll(options: FindOptions): Promise<User[]> {
    try {
      return await this.userRepository.findAll<User>({
        ...options,
        attributes: {
          exclude: ['password', 'stripeId', 'confirmed'],
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.userRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async deleteByEmail(email: string): Promise<number> {
    try {
      return await this.userRepository.destroy({ where: { email } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async searchUsers(options) {
    try {
      const order = [];
      const where = { role: Roles.SELLER };
      const musicWhere = { status: MusicStatus.PUBLISHED };
      let relevanceRange;

      if (options.order) {
        if (userOrderFields.includes(options.order[0][0])) {
          order.push([options.order[0]]);
        } else {
          order.push(['musics', ...options.order[0]]);
        }
      } else {
        order.push(['id', 'ASC']);
      }

      const {
        categories,
        instruments,
        keys,
        moods,
        types,
        cost,
        relevance,
        ...filters
      } = options.filters || {};
      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          if (musicOrderFields.includes(key)) {
            musicWhere[key] = value;
          } else {
            where[key] = value;
          }
        }
      }

      if (options.search) {
        where[Op.or] = options.search.fields
          .filter((field) => userOrderFields.includes(field))
          .map((item) => ({
            [item]: { [Op.iLike]: `%${options.search.value}%` },
          }));
      }

      if (relevance) {
        relevanceRange = getRelevanceTimeRange(relevance);
      }

      const includes = [
        {
          model: Category,
          as: 'categories',
          where: categories ? { id: categories } : undefined,
          required: true,
        },
        {
          model: Instrument,
          as: 'instruments',
          where: instruments ? { id: instruments } : undefined,
          required: true,
        },
        {
          model: Key,
          as: 'keys',
          where: keys ? { id: keys } : undefined,
          required: true,
        },
        {
          model: Mood,
          as: 'moods',
          where: moods ? { id: moods } : undefined,
          required: true,
        },
        {
          model: TrackType,
          as: 'types',
          where: types ? { id: types } : undefined,
          required: true,
        },
        {
          model: MusicFiles,
          as: 'files',
          attributes: ['id', 'cost', 'type'],
          where: cost ? { cost } : undefined,
          required: true,
        },
        {
          model: MusicsHistory,
          as: 'history',
          where: relevanceRange
            ? { createdAt: { [Op.gte]: relevanceRange } }
            : undefined,
          required: true,
        },
      ];

      const { count, rows: users } = await this.userRepository.findAndCountAll({
        attributes: {
          exclude: [
            'password',
            'stripeId',
            'subscribedUntil',
            'confirmed',
            'role',
          ],
        },
        order,
        limit: +options.limit,
        offset: +options.offset,
        distinct: true,
        where,
        include: [
          {
            model: Music,
            as: 'musics',
            required: true,
            where: musicWhere,
          },
        ],
      });

      return { users, count };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
