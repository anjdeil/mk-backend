import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Includeable } from 'sequelize';

import { MUSIC_COMMENTS_REPOSITORY } from '../constants';
import MusicsComments from '../models/comments.entity';
import User from '../models/user.entity';
import { TMusicsComments } from '../types/comments';

@Injectable()
export class MusicsCommentsRepository {
  private readonly include: Includeable[] = [
    { model: User, attributes: ['id', 'name', 'avatar', 'pseudonym', 'role'] },
    {
      model: MusicsComments,
      as: 'children',
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'avatar', 'pseudonym', 'role'],
        },
      ],
    },
  ];

  constructor(
    @Inject(MUSIC_COMMENTS_REPOSITORY)
    private readonly commentsRepository: typeof MusicsComments,
  ) {}

  public async create(comment: TMusicsComments): Promise<MusicsComments> {
    try {
      return await this.commentsRepository.create<MusicsComments>(comment);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async update(
    id: number,
    comment: TMusicsComments,
  ): Promise<MusicsComments> {
    try {
      return await this.commentsRepository.update<MusicsComments>(comment, {
        where: { id },
        returning: true,
      })[1][0];
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneById(id: number): Promise<MusicsComments> {
    try {
      return await this.commentsRepository.findByPk<MusicsComments>(id, {
        include: this.include,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAllByMusic(musicId: number): Promise<MusicsComments[]> {
    try {
      return await this.commentsRepository.findAll<MusicsComments>({
        where: { musicId },
        include: this.include,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async delete(musicId: number, userId: number): Promise<void> {
    try {
      await this.commentsRepository.destroy({ where: { musicId, userId } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
