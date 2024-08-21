import { Inject, Injectable } from '@nestjs/common';

import { FOLLOW_REPOSITORY } from '../constants';
import Follow from '../models/follow.entity';
import { TFollow } from '../types/follow';

@Injectable()
export class FollowRepository {
  constructor(
    @Inject(FOLLOW_REPOSITORY)
    private readonly followModel: typeof Follow,
  ) {}

  async getAllFollowersIdsByFollowerId(followerId: number): Promise<number[]> {
    const followers = await this.followModel.findAll({
      where: { followingId: followerId },
      attributes: ['followerId'],
      raw: true,
    });

    return followers.map((follower) => follower.followerId);
  }

  async follow(data: TFollow): Promise<Follow> {
    return await this.followModel.create(data);
  }

  async unfollow(data: TFollow): Promise<void> {
    await this.followModel.destroy({ where: data });
  }

  async countFollowers(userId: number): Promise<number> {
    return await this.followModel.count({ where: { followingId: userId } });
  }
}
