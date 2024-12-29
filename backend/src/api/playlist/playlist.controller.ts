import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  LoggerService,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';

import { PlaylistService } from './playlist.service';
import { SearchFiltersDto } from '../../core/dto';
import {
  CreatePlaylistDto,
  UpdatePlaylistDto,
} from '../../core/dto/playlist.dto';
import { TPlaylistsCreateCoverImage } from '../../core/types';
import { AuthRequest } from '../../core/types/common';

@ApiTags('playlists')
@Controller('playlists')
export class PlaylistController {
  private readonly logger: LoggerService = new Logger(PlaylistController.name);
  constructor(private readonly playlistService: PlaylistService) {}

  @Get()
  @ApiOperation({ summary: 'Get all public playlists' })
  @ApiResponse({ status: 200, description: 'Return all public playlists.' })
  public async getAllPublicPlaylists(@Query() options: SearchFiltersDto) {
    return await this.playlistService.getAllPublicPlaylists(options);
  }
  @Post()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a new playlist' })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'previewImage', maxCount: 1 }]),
  )
  @ApiResponse({
    status: 201,
    description: 'The playlist has been successfully created.',
  })
  @UseGuards(AuthGuard('jwt'))
  public async createPlaylist(
    @Req() req: AuthRequest,
    @UploadedFiles()
    files: TPlaylistsCreateCoverImage,
    @Body() data,
  ) {
    this.logger.debug('FILES', data);

    return await this.playlistService.createPlaylist(data, files, req.user);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a playlist' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'The playlist has been successfully updated.',
  })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'previewImage', maxCount: 1 }]),
  )
  @UseGuards(AuthGuard('jwt'))
  public async updatePlaylist(
    @Param('id') id: number,
    @UploadedFiles()
    files: TPlaylistsCreateCoverImage,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    console.log(files);
    return await this.playlistService.updatePlaylist(
      id,
      updatePlaylistDto,
      files,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a playlist' })
  @ApiResponse({
    status: 200,
    description: 'The playlist has been successfully deleted.',
  })
  @UseGuards(AuthGuard('jwt'))
  public async deletePlaylist(@Param('id') id: number) {
    return await this.playlistService.deletePlaylist(id);
  }

  @Post(':playlistId/tracks/:trackId')
  @ApiOperation({ summary: 'Add a track to a playlist' })
  @ApiResponse({
    status: 200,
    description: 'Track has been added to the playlist successfully.',
  })
  @UseGuards(AuthGuard('jwt'))
  public async addTrackToPlaylist(
    @Param('playlistId') playlistId: number,
    @Param('trackId') trackId: number,
  ) {
    await this.playlistService.addTrackToPlaylist(playlistId, trackId);
    return { message: 'Track added to playlist successfully.' };
  }

  @Delete(':playlistId/tracks/:trackId')
  @ApiOperation({ summary: 'Remove a track from a playlist' })
  @ApiResponse({
    status: 200,
    description: 'Track has been removed from the playlist successfully.',
  })
  @UseGuards(AuthGuard('jwt'))
  public async removeTrackFromPlaylist(
    @Param('playlistId') playlistId: number,
    @Param('trackId') trackId: number,
  ) {
    await this.playlistService.removeTrackFromPlaylist(playlistId, trackId);
    return { message: 'Track removed from playlist successfully.' };
  }

  @Patch(':id/description')
  @ApiOperation({ summary: 'Update playlist description' })
  @ApiResponse({
    status: 200,
    description: 'Playlist description has been updated successfully.',
  })
  @UseGuards(AuthGuard('jwt'))
  public async updatePlaylistDescription(
    @Param('id') id: number,
    @Body('description') description: string,
  ) {
    await this.playlistService.updatePlaylistDescription(id, description);
    return { message: 'Playlist description updated successfully.' };
  }

  @Patch(':id/visibility')
  @ApiOperation({ summary: 'Change playlist visibility' })
  @ApiResponse({
    status: 200,
    description: 'Playlist visibility has been changed successfully.',
  })
  @UseGuards(AuthGuard('jwt'))
  public async changePlaylistVisibility(
    @Param('id') id: number,
    @Body('isPublic') isPublic: boolean,
  ) {
    await this.playlistService.changePlaylistVisibility(id, isPublic);
    return { message: 'Playlist visibility changed successfully.' };
  }

  @Post(':id/cover')
  @ApiOperation({ summary: 'Add or update playlist cover' })
  @ApiResponse({
    status: 200,
    description: 'Playlist cover has been added or updated successfully.',
  })
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('coverImage'))
  public async addOrUpdatePlaylistCover(
    @Param('id') id: number,
    @UploadedFile() coverImageFile: Express.Multer.File,
  ) {
    await this.playlistService.addOrUpdatePlaylistCover(id, coverImageFile);
    return { message: 'Playlist cover added or updated successfully.' };
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get playlists by user' })
  @ApiResponse({
    status: 200,
    description: 'Return all playlists of a given user.',
  })
  @UseGuards(AuthGuard('jwt'))
  public async getPlaylistsByUser(@Param('userId') userId: number) {
    const playlists = await this.playlistService.getPlaylistsByUser(userId);
    return { playlists };
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get playlist by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return playlist by playlist ID.',
  })
  public async getPlaylistsById(@Param('id') id: number) {
    const playlist = await this.playlistService.getPlaylistById(id);
    return { playlist };
  }
}
