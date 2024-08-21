import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  LoggerService,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SearchFiltersDto } from 'src/core/dto';

import { PlaylistFollowService } from './playlist-follow.service';
import { Playlist } from '../../../core/models';

@ApiTags('playlist-follows')
@Controller('playlist-follows')
export class PlaylistFollowController {
  private readonly logger: LoggerService = new Logger(
    PlaylistFollowController.name,
  );

  constructor(private readonly playlistFollowService: PlaylistFollowService) {}

  @Post(':playlistId/follow')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Follow a playlist' })
  @ApiResponse({
    status: 201,
    description: 'The user has successfully followed the playlist.',
  })
  @UseGuards(AuthGuard('jwt'))
  public async followPlaylist(
    @Param('playlistId') playlistId: number,
    @Body('userId') userId: number,
  ): Promise<void> {
    await this.playlistFollowService.followPlaylist(userId, playlistId);
  }

  @Delete(':playlistId/unfollow')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unfollow a playlist' })
  @ApiResponse({
    status: 200,
    description: 'The user has successfully unfollowed the playlist.',
  })
  @UseGuards(AuthGuard('jwt'))
  public async unfollowPlaylist(
    @Param('playlistId') playlistId: number,
    @Body('userId') userId: number,
  ): Promise<void> {
    await this.playlistFollowService.unfollowPlaylist(userId, playlistId);
  }

  @Get(':playlistId/followers')
  @ApiOperation({ summary: 'Get followers of a playlist' })
  @ApiResponse({
    status: 200,
    description: 'Return all followers of the playlist.',
  })
  public async getPlaylistFollowers(
    @Param('playlistId') playlistId: number,
  ): Promise<number[]> {
    return await this.playlistFollowService.getPlaylistFollowers(playlistId);
  }

  @Get(':userId/followed')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get playlists followed by user' })
  @ApiResponse({
    status: 200,
    description: 'Return all playlists followed by the user.',
  })
  @UseGuards(AuthGuard('jwt'))
  public async getFollowedPlaylists(
    @Param('userId') userId: number,
    @Query() options: SearchFiltersDto,
  ): Promise<{ playlists: Playlist[]; count: number }> {
    return await this.playlistFollowService.getFollowedPlaylists(
      userId,
      options,
    );
  }
}
