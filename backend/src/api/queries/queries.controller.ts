import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  LoggerService,
  Param,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { QueriesService } from './queries.service';
import { ArtistIdDto, CategoryFilterDto, PaginationDto } from '../../core/dto';

@ApiTags('queries')
@Controller('queries')
export class QueriesController {
  private readonly logger: LoggerService = new Logger(QueriesController.name);

  constructor(private readonly queriesService: QueriesService) {}

  @ApiOperation({ summary: 'Get trending, sorted by `listenCount`' })
  @ApiResponse({
    status: 200,
  })
  @Get('trending')
  async tredning() {
    return this.queriesService.getTrendingTracks();
  }

  @ApiOperation({ summary: 'Get premium, sorted by `createdAt`' })
  @ApiResponse({
    status: 200,
  })
  @Get('premium')
  async premium() {
    return this.queriesService.getPremiumTracks();
  }

  @ApiOperation({ summary: 'Get artist tracks, sorted by `createdAt`' })
  @ApiResponse({
    status: 200,
  })
  @Get('profile/:artistId')
  async profile(
    @Param() params: ArtistIdDto,
    @Query() pagination: PaginationDto,
  ) {
    return this.queriesService.getUserTracks(params.artistId, pagination);
  }

  @ApiOperation({
    summary:
      'Get tracks with the same categories, excluding current artist, sorted by `listenCount`',
  })
  @ApiResponse({
    status: 200,
  })
  @Get('featured/:artistId')
  async featured(
    @Param() params: ArtistIdDto,
    @Query() query: CategoryFilterDto,
  ) {
    if (!query.categories.length)
      throw new BadRequestException('Categories array must be provided!');

    return this.queriesService.getFeaturedTracks(
      params.artistId,
      query.categories,
    );
  }
}
