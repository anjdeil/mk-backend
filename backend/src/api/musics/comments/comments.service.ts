import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { TMusicsComments } from './../../../core/types/comments';
import { NotificationMessages } from '../../../core/constants/notifications';
import { NotificationType } from '../../../core/enums';
import { MusicsComments } from '../../../core/models';
import
{
  MusicsCommentsRepository,
  MusicsRepository,
  NotificationsRepository,
} from '../../../core/repositories';
import { TUser } from '../../../core/types';

@Injectable()
export class CommentsService
{
  constructor(
    private readonly commentsRepository: MusicsCommentsRepository,
    private readonly musicsRepository: MusicsRepository,
    private readonly notificationRepository: NotificationsRepository,
  ) { }

  public async createComment(
    data: TMusicsComments,
    user: TUser,
  ): Promise<{ comment: MusicsComments }>
  {
    try
    {
      data.userId = user.id;
      const comment = await this.commentsRepository.create(data);
      if (data.parentCommentId)
      {
        const parentComment = await this.commentsRepository.findOneById(
          data.parentCommentId,
        );
        await this.notificationRepository.create({
          type: NotificationType.COMMENTED_TO_COMMENT,
          userId: parentComment.userId,
          message: NotificationMessages.COMMENTED_TO_COMMENT(user.name),
          link: `/track/${data.musicId}`,
        });
      } else
      {
        const music = await this.musicsRepository.findOneById(data.musicId);
        await this.notificationRepository.create({
          userId: music.artistId,
          type: NotificationType.COMMENTED_TO_MUSIC,
          message: NotificationMessages.COMMENTED_TO_MUSIC(
            user.name,
            music.title,
          ),
        });
      }

      return { comment };
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async updateComment(
    id: number,
    data: TMusicsComments,
    user: TUser,
  ): Promise<{ comment: MusicsComments }>
  {
    try
    {
      data.userId = user.id;
      const comment = await this.commentsRepository.update(id, data);
      return { comment };
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async getComment(id: number): Promise<{ comment: MusicsComments }>
  {
    try
    {
      const comment = await this.commentsRepository.findOneById(id);
      return { comment };
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async getCommentsByTrack(
    id: number,
  ): Promise<{ comments: MusicsComments[] }>
  {
    try
    {
      const comments = await this.commentsRepository.findAllByMusic(id);
      return { comments };
    } catch (error)
    {
      console.error('error :>> ', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  public async deleteComment(id: number, userId: number): Promise<void>
  {
    try
    {
      await this.commentsRepository.delete(id, userId);
      return;
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }
}
