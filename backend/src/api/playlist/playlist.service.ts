import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { SearchFiltersDto } from '../../core/dto';
import {
  CreatePlaylistDto,
  UpdatePlaylistDto,
} from '../../core/dto/playlist.dto';
import { PlaylistsRepository } from '../../core/repositories';
import { TPlaylist, TPlaylistsCreateCoverImage, TUser } from '../../core/types';
import { FileStorageService } from '../../shared/services';

@Injectable()
export class PlaylistService {
  constructor(
    private readonly playlistsRepository: PlaylistsRepository,
    private readonly fileStorageService: FileStorageService,
  ) {}

  public async createPlaylist(
    data: CreatePlaylistDto,
    files: TPlaylistsCreateCoverImage,
    user: TUser,
  ): Promise<void> {
    try {
      await this.playlistsRepository.create(
        { ...data, ownerId: user.id },
        files?.previewImage ? files?.previewImage[0] : undefined,
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async updatePlaylist(
    id: number,
    data: UpdatePlaylistDto,
    files: TPlaylistsCreateCoverImage,
  ): Promise<void> {
    try {
      const updated = await this.playlistsRepository.update(
        id,
        data,
        files,
      );
      if (!updated) {
        throw new NotFoundException(`Playlist with id ${id} not found.`);
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async deletePlaylist(id: number): Promise<void> {
    try {
      await this.playlistsRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async addTrackToPlaylist(
    playlistId: number,
    trackId: number,
  ): Promise<void> {
    try {
      await this.playlistsRepository.addTrack(playlistId, trackId);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async removeTrackFromPlaylist(
    playlistId: number,
    trackId: number,
  ): Promise<void> {
    try {
      await this.playlistsRepository.removeTrack(playlistId, trackId);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  public async updatePlaylistDescription(
    playlistId: number,
    description: string,
  ): Promise<void> {
    try {
      await this.playlistsRepository.updatePlaylistDescription(
        playlistId,
        description,
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async changePlaylistVisibility(
    playlistId: number,
    isPublic: boolean,
  ): Promise<void> {
    try {
      await this.playlistsRepository.changePlaylistVisibility(
        playlistId,
        isPublic,
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async addOrUpdatePlaylistCover(
    playlistId: number,
    coverImageFile: Express.Multer.File,
  ): Promise<void> {
    try {
      await this.playlistsRepository.addOrUpdatePlaylistCover(
        playlistId,
        coverImageFile,
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async getPlaylistsByUser(userId: number): Promise<TPlaylist[]> {
    try {
      return await this.playlistsRepository.findAllByUser(userId);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async getAllPublicPlaylists(
    options: SearchFiltersDto,
  ): Promise<{ playlists: TPlaylist[]; count: number }> {
    try {
      const { offset, limit } = options;
      return await this.playlistsRepository.findAllPublic(+limit, +offset);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async getPlaylistById(id: number): Promise<TPlaylist> {
    try {
      return await this.playlistsRepository.findOneById(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
