import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Op, WhereOptions } from 'sequelize';

import { FileStorageService } from '../../shared/services';
import {
  MUSICS_REPOSITORY,
  PLAYLIST_FOLLOWS_REPOSITORY,
  PLAYLIST_MUSICS_REPOSITORY,
  PLAYLIST_REPOSITORY,
} from '../constants';
import { musicForPlaylistsInclude, musicInclude } from '../constants/includes';
import { playlistsSearchField } from '../constants/search';
import { CreatePlaylistDto, UpdatePlaylistDto } from '../dto/playlist.dto';
import { BucketType, MusicStatus } from '../enums';
import Music from '../models/music.entity';
import Playlist from '../models/playlist.entity';
import PlaylistFollow from '../models/playlistFollow.entity';
import PlaylistMusic from '../models/playlistTracks.entity';
import {CompressedFile, TPlaylistsCreateCoverImage} from '../types';

@Injectable()
export class PlaylistsRepository {
  constructor(
    @Inject(PLAYLIST_REPOSITORY)
    private readonly playlistRepository: typeof Playlist,
    @Inject(PLAYLIST_FOLLOWS_REPOSITORY)
    private readonly playlistFollowRepository: typeof PlaylistFollow,
    @Inject(MUSICS_REPOSITORY)
    private readonly musicModel: typeof Music,
    @Inject(PLAYLIST_MUSICS_REPOSITORY)
    private readonly playlistTracksRepository: typeof PlaylistMusic,
    private readonly fileStorageService: FileStorageService,
  ) {}

  public async create(
    data: CreatePlaylistDto,
    coverImage?: Express.Multer.File,
  ): Promise<Playlist> {
    try {
      const playlist = await this.playlistRepository.create(data);

      if (coverImage) {
        const coverImageUrl = await this.fileStorageService.uploadFile(
          coverImage,
          BucketType.PREVIEW,
          `playlist/${playlist.id}`,
          'cover',
          true,
        );

        await playlist.update({ coverImage: coverImageUrl });
      }

      return playlist;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAllByUser(userId: number): Promise<Playlist[]> {
    try {
      return this.playlistRepository.findAll({
        where: { ownerId: userId },
        include: [
          {
            model: Music,
            as: 'musics',
            include: musicForPlaylistsInclude,
          },
        ],
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneById(id: number): Promise<Playlist> {
    try {
      const playlist = await this.playlistRepository.findByPk(id, {
        include: [
          {
            model: Music,
            as: 'musics',
            include: musicForPlaylistsInclude,
          },
        ],
      });

      if (!playlist) {
        throw new NotFoundException(`Playlist with id ${id} not found.`);
      }

      return playlist;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async update(
    id: number,
    data: UpdatePlaylistDto,
    coverImage?: TPlaylistsCreateCoverImage,
  ): Promise<Playlist> {
    try {
      const playlist = await this.playlistRepository.findByPk(id);
      if (!playlist) {
        throw new NotFoundException(`Playlist with id ${id} not found.`);
      }

      if (coverImage?.previewImage) {
        const coverImageUrl = await this.fileStorageService.uploadFile(
          coverImage?.previewImage[0],
          BucketType.PREVIEW,
          `playlist/${playlist.id}`,
          'cover',
          true,
        );

        await playlist.update({ coverImage: coverImageUrl });
      }

      const [updateCount, [updatedPlaylist]] =
        await this.playlistRepository.update(
          { ...data, public: data.isPublic },
          { where: { id }, returning: true },
        );

      if (updateCount === 0) {
        throw new InternalServerErrorException(
          `Playlist with id ${id} was not updated.`,
        );
      }

      return updatedPlaylist;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async addOrUpdatePlaylistCover(
    playlistId: number,
    coverImage: Express.Multer.File,
  ): Promise<void> {
    try {
      const playlist = await this.playlistRepository.findByPk(playlistId);
      if (!playlist) {
        throw new NotFoundException(
          `Playlist with id ${playlistId} not found.`,
        );
      }

      const coverImageUrl = await this.fileStorageService.uploadFile(
        coverImage,
        BucketType.PREVIEW,
        `playlist/${playlistId}`,
        'cover',
        true,
      );

      await playlist.update({ coverImage: coverImageUrl });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async addTrack(playlistId: number, trackId: number): Promise<void> {
    try {
      const trackExists = await this.musicModel.findByPk(trackId);
      if (!trackExists) {
        throw new NotFoundException(`Track with id ${trackId} not found.`);
      }

      const playlistExists = await this.playlistRepository.findByPk(playlistId);
      if (!playlistExists) {
        throw new NotFoundException(
          `Playlist with id ${playlistId} not found.`,
        );
      }

      await this.playlistTracksRepository.create({
        playlistId: playlistId,
        musicId: trackId,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async removeTrack(playlistId: number, trackId: number): Promise<void> {
    try {
      const playlistTrack = await this.playlistTracksRepository.findOne({
        where: {
          playlistId: playlistId,
          musicId: trackId,
        },
      });

      if (playlistTrack) {
        await playlistTrack.destroy();
      } else {
        throw new NotFoundException(
          `Track with id ${trackId} not found in playlist with id ${playlistId}.`,
        );
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async updatePlaylistDescription(
    playlistId: number,
    description: string,
  ): Promise<void> {
    try {
      const playlist = await this.playlistRepository.findByPk(playlistId);
      if (!playlist) {
        throw new NotFoundException(
          `Playlist with id ${playlistId} not found.`,
        );
      }

      await playlist.update({ description });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async changePlaylistVisibility(
    playlistId: number,
    isPublic: boolean,
  ): Promise<void> {
    try {
      const playlist = await this.playlistRepository.findByPk(playlistId);
      if (!playlist) {
        throw new NotFoundException(
          `Playlist with id ${playlistId} not found.`,
        );
      }

      await playlist.update({ public: isPublic });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAllPublic(
    limit = 10,
    offset = 0,
  ): Promise<{ playlists: any[]; count: number }> {
    try {
      const count = await this.playlistRepository.count({
        where: { public: true },
      });

      const playlists = await this.playlistRepository.findAll({
        where: { public: true },
        limit,
        offset,
        include: [
          {
            model: Music,
            as: 'musics',
          },
          {
            model: this.playlistFollowRepository,
            as: 'followers',
            attributes: ['userId'],
          },
        ],
      });

      const followersByPlaylistId = playlists.reduce((acc, playlist) => {
        acc[playlist.id] = playlist.followers.map(
          (follower) => follower.userId,
        );
        return acc;
      }, {});

      const result = playlists.map((playlist) => ({
        ...playlist.toJSON(),
        followers: followersByPlaylistId[playlist.id] || [],
      }));

      console.log('Result:', result); // Логируем результат

      return { playlists: result, count };
    } catch (error) {
      console.error(error); // Логируем ошибку
      throw new InternalServerErrorException(error.message);
    }
  }

  public async delete(id: number): Promise<void> {
    const playlist = await this.findOneById(id);
    await playlist.destroy();
  }

  public async searchPlaylists(
    options: any,
    limit = 10,
    offset = 0,
  ): Promise<{ playlists: any[]; count: number }> {
    try {
      let where: WhereOptions = {};

      if (options?.search?.value) {
        where = {
          title: { [Op.iLike]: `%${options.search.value}%` },
          public: true,
        };
      } else {
        where = {
          public: true,
        };
      }

      const count = await this.playlistRepository.count({ where });

      const playlists = await this.playlistRepository.findAll({
        where,
        limit,
        offset,
        include: [
          {
            model: Music,
            as: 'musics',
          },
          {
            model: PlaylistFollow,
            as: 'followers',
            attributes: ['userId'],
          },
        ],
      });

      const followersByPlaylistId = playlists.reduce((acc, playlist) => {
        acc[playlist.id] = playlist.followers.map(
          (follower) => follower.userId,
        );
        return acc;
      }, {});

      const result = playlists.map((playlist) => ({
        ...playlist,
        followers: followersByPlaylistId[playlist.id] || [],
      }));

      return { playlists: result, count };
    } catch (error) {
      throw new InternalServerErrorException(
        `Ошибка при поиске плейлистов: ${error.message}`,
      );
    }
  }
}
