import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { ContentService } from './content.service';
import { CommonFilterSchema } from '../../core/swagger.objects';
import { AuthRequest } from '../../core/types/common';

@ApiTags('content')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @ApiOperation({ summary: 'Get content' })
  @ApiConsumes('application/json')
  @ApiResponse({ status: 200, description: 'Get content' })
  @ApiQuery({ type: CommonFilterSchema })
  @Get()
  public async get(@Query() options: AuthRequest) {
    return await this.contentService.get(options);
  }

  @ApiOperation({ summary: 'Get media content' })
  @ApiConsumes('application/json')
  @ApiResponse({ status: 200, description: 'Get media content' })
  @ApiQuery({ type: CommonFilterSchema })
  @Get('media')
  public async getMedia(@Query() options: AuthRequest) {
    console.log('options :>> ', options);
    return await this.contentService.getMediaContent(options);
  }

  @ApiOperation({ summary: 'Get media content by id' })
  @ApiConsumes('application/json')
  @ApiResponse({ status: 200, description: 'Get media content by id' })
  @Get('media/:id')
  public async getMediaById(@Param('id') id: number) {
    return await this.contentService.getMediaContentById(id);
  }

  @ApiOperation({ summary: 'Get content by id' })
  @ApiConsumes('application/json')
  @ApiResponse({ status: 200, description: 'Get content by id' })
  @Get(':id')
  public async getById(@Param('id') id: number) {
    return await this.contentService.getById(id);
  }
}
