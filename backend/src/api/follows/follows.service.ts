import { Injectable } from '@nestjs/common';

import { NotificationMessages } from '../../core/constants/notifications';
import { NotificationType } from '../../core/enums';
import {
  NotificationsRepository,
  UsersRepository,
} from '../../core/repositories';
import { FollowRepository } from '../../core/repositories/follow.repository';
import { TFollow } from '../../core/types/follow';

@Injectable()
export class FollowService {
  constructor(
    private readonly followRepository: FollowRepository,
    private readonly notificationsRepository: NotificationsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async followUser(data: TFollow): Promise<void> {
    await this.followRepository.follow(data);
    const followerUser = await this.usersRepository.findOneById(
      data.followerId,
    );

    await this.notificationsRepository.create({
      type: NotificationType.NEW_FOLLOWER,
      userId: data.followingId,
      message: NotificationMessages.NEW_FOLLOWER({
        name: followerUser.name,
        avatarUrl: followerUser.avatar,
      }),
      link: `/my-profile-seller`,
    });
  }

  async unfollowUser(data: TFollow): Promise<void> {
    await this.followRepository.unfollow(data);
  }
}
