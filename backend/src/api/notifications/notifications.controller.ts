import
{
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import
{
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { NotificationsService } from './notifications.service';
import { IsAdminGuard } from '../../core/guards';
import { AuthRequest } from '../../core/types/common';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController
{
  constructor(private readonly notificationsService: NotificationsService) { }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Get all notifications' })
  @ApiOperation({ summary: 'Get all notifications' })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllNotifications(@Req() req: AuthRequest)
  {
    return await this.notificationsService.findAllByUser(req.user.id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Get all unread notifications' })
  @ApiOperation({ summary: 'Get all unread notifications' })
  @UseGuards(AuthGuard('jwt'))
  @Get('unread')
  async getAllUnreadNotifications(@Req() req: AuthRequest)
  {
    return await this.notificationsService.findAllUnreadByUser(req.user.id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Mark all notifications as read' })
  @ApiOperation({ summary: 'Mark all notifications as read' })
  @UseGuards(AuthGuard('jwt'))
  @Put('readAll')
  async markAllAsRead(@Req() req: AuthRequest)
  {
    return await this.notificationsService.setReadForAllNotifications(
      req.user.id,
    );
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Mark selected notifications as read',
  })
  @ApiOperation({ summary: 'Mark all notifications as read' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'array',
          items: {
            type: 'number',
          },
        },
      },
    },
  })
  @Put('read')
  async markNotificationsAsRead(@Req() req: AuthRequest)
  {
    return await this.notificationsService.setReadForNotifications(
      req.user.id,
      req.body.id,
    );
  }

  @UseGuards(IsAdminGuard)
  @Post('admin')
  async createNotificationFromAdmin(@Body() body)
  {
    console.log('test', body);
    return await this.notificationsService.createNotification(body);
  }
}
