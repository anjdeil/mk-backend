import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AllowedRoles } from '../../core/decorators';
import { Roles } from '../../core/enums';
import { RolesGuard } from '../../core/guards';
import { UsersRepository } from '../../core/repositories';
import { FollowRepository } from '../../core/repositories/follow.repository';
import {
  CommonFilterSchema,
  userUpdateSchema,
} from '../../core/swagger.objects';
import { AuthRequest } from '../../core/types/common';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly followsRepository: FollowRepository,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The users has been successfully fetched',
    type: 'application/json',
  })
  @ApiQuery({
    type: CommonFilterSchema,
  })
  @ApiOperation({ summary: 'Get all users' })
  async getAllUsers(@Req() req: AuthRequest) {
    return await this.userRepository.findAll(req.filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully fetched',
    type: 'application/json',
  })
  async getUserById(@Param('id') id: number) {
    const user = await this.userRepository.findOneById(id, {
      attributes: {
        exclude: ['password', 'stripeId', 'confirmed'],
      },
    });

    const followersCount = await this.followsRepository.countFollowers(user.id);
    const followersIds =
      await this.followsRepository.getAllFollowersIdsByFollowerId(user.id);

    return { ...user.dataValues, followersCount, followersIds };
  }

  @Put(':id')
  @AllowedRoles(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Update user by id for admins' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated',
    type: 'application/json',
  })
  @ApiBody({
    schema: userUpdateSchema,
  })
  @ApiBearerAuth()
  async updateUser(@Body() data: any, @Param('id') id: number) {
    return await this.userRepository.update(id, data);
  }
}
