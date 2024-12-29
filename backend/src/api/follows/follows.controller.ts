import {
  Controller,
  Post,
  Delete,
  Param,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

import { FollowService } from './follows.service';
import { AllowedRoles } from '../../core/decorators';
import { Roles } from '../../core/enums';
import { RolesGuard } from '../../core/guards';

@ApiTags('follows')
@Controller('follows')
export class FollowsController {
  constructor(private readonly followService: FollowService) {}

  @Post(':followerId/:followingId')
  @ApiResponse({ status: 201, description: 'Successfully followed user' })
  @ApiResponse({
    status: 400,
    description: 'Invalid followerId or followingId',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async followUser(
    @Param('followerId') followerId: number,
    @Param('followingId') followingId: number,
  ): Promise<void> {
    if (followerId === followingId) {
      throw new BadRequestException(
        'followerId and followingId cannot be the same',
      );
    }
    await this.followService.followUser({ followerId, followingId });
  }

  @Delete(':followerId/:followingId')
  @ApiResponse({ status: 200, description: 'Successfully unfollowed user' })
  @ApiResponse({
    status: 400,
    description: 'Invalid followerId or followingId',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async unfollowUser(
    @Param('followerId') followerId: number,
    @Param('followingId') followingId: number,
  ): Promise<void> {
    if (followerId === followingId) {
      throw new BadRequestException(
        'followerId and followingId cannot be the same',
      );
    }
    await this.followService.unfollowUser({ followerId, followingId });
  }
}
