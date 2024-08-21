import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { SettingsService } from './settings.service';
import { NotificationsSettingsDto } from '../../../../core/dto';
import { JwtAuthGuard } from '../../../../core/guards';
import { Settings } from '../../../../core/models';
import { AuthRequest } from '../../../../core/types/common';

@ApiTags('profile settings')
@Controller('profile/settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @ApiOperation({ summary: 'Update user settings' })
  @ApiResponse({
    status: 200,
    description: 'User settings successfully updated',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put()
  public async update(
    @Req() req: AuthRequest,
    @Body() data: NotificationsSettingsDto,
  ): Promise<Settings> {
    return await this.settingsService.update(req.user.id, data);
  }

  @ApiOperation({ summary: 'Get user settings' })
  @ApiResponse({
    status: 200,
    description: 'User settings successfully received',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  public async findOneByUser(@Req() req: AuthRequest): Promise<Settings> {
    return await this.settingsService.findOneByUser(req.user.id);
  }
}
