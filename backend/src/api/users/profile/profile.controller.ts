import {
  Body,
  Controller,
  Delete,
  Get,
  Patch, Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ProfileService } from './profile.service';
import { AllowedRoles } from '../../../core/decorators';
import { UpdateUserDto } from '../../../core/dto';
import { Roles } from '../../../core/enums';
import { JwtAuthGuard, RolesGuard } from '../../../core/guards';
import { AuthRequest } from '../../../core/types/common';

@ApiBearerAuth()
@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'The user profile has been successfully retrieved',
    type: 'application/json',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Req() req: AuthRequest) {
    return await this.profileService.getProfile(req.user.id);
  }

  @ApiOperation({ summary: 'Get user balance' })
  @ApiResponse({
    status: 200,
    description: 'The user balance has been successfully retrieved',
    type: 'application/json',
  })
  @UseGuards(JwtAuthGuard)
  @Get('balance')
  async getBalnce(@Req() req: AuthRequest) {
    return await this.profileService.getBalance(req.user.id);
  }

  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({
    status: 200,
    description: 'The user profile has been successfully updated',
    type: 'application/json',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateUserDto })
  @Put()
  async updateProfile(@Req() req: AuthRequest, @Body() data: UpdateUserDto) {
    return await this.profileService.updateProfile(req.user, data);
  }

  @ApiOperation({ summary: 'Start Verification Process' })
  @ApiResponse({
    status: 200,
    description:
      'The user profile verification process has been successfully started',
    type: 'application/json',
  })
  @UseGuards(JwtAuthGuard)
  @Post('verify')
  async verificationProcessStart(@Req() req: AuthRequest) {
    return await this.profileService.requestProfileVerification(req.user);
  }

  @ApiOperation({ summary: 'Update user avatar' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'file',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiResponse({
    status: 200,
    description: 'The user avatar has been successfully updated',
    type: 'application/json',
  })
  @UseGuards(JwtAuthGuard)
  @Put('avatar')
  async updateAvatar(
    @Req() req: AuthRequest,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return await this.profileService.updateAvatar(req.user, avatar);
  }

  @ApiOperation({ summary: 'Delete user profile' })
  @ApiResponse({
    status: 200,
    description: 'The user profile has been successfully deleted',
    type: 'application/json',
  })
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteProfile(@Req() req: AuthRequest) {
    return await this.profileService.deleteProfile(req.user.id);
  }

  @ApiOperation({ summary: 'Upgrade user to seller' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully upgraded to seller',
    type: 'application/json',
  })
  @AllowedRoles(Roles.BUYER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch('upgrade')
  async upgradeToSeller(@Req() req: AuthRequest) {
    return await this.profileService.updateProfile(req.user, {
      role: Roles.SELLER,
    });
  }

  @ApiOperation({ summary: 'Downgrade user to buyer' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully downgraded to buyer',
    type: 'application/json',
  })
  @AllowedRoles(Roles.SELLER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch('downgrade')
  async downgradeToBuyer(@Req() req: AuthRequest) {
    return await this.profileService.updateProfile(req.user, {
      role: Roles.BUYER,
    });
  }
}
