import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { HistoryService } from './history.service';
import { historySchema } from '../../../core/swagger.objects';
import { AuthRequest } from '../../../core/types/common';
@ApiTags('history')
@Controller('history')
export class HistoryController {
  constructor(private readonly historySerice: HistoryService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The music has been successfully added to history.',
  })
  @ApiOperation({ summary: 'Add track to history' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        musicId: {
          type: 'number',
        },
      },
    },
  })
  public async addToHistory(@Body() data, @Req() req: AuthRequest) {
    return await this.historySerice.addToHistory(data.musicId, req.user.id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The history has been successfully retrieved.',
    schema: historySchema,
  })
  @ApiOperation({ summary: 'Get history by user' })
  public async getHistoryByUser(@Req() req: AuthRequest) {
    return await this.historySerice.getHistoryByUser(req.user.id);
  }
}
