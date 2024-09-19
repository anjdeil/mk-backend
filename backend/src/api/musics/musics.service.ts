import { HttpService } from '@nestjs/axios';
import
{
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { FindOptions } from 'sequelize';

import { NotificationMessages } from '../../core/constants/notifications';
import
{
  BucketType,
  MusicStatus,
  NotificationType,
  Roles,
} from '../../core/enums';
import { byteToMb } from '../../core/helpers';
import { Music } from '../../core/models';
import
{
  CartRepository,
  MusicsFilesRepository,
  MusicsRepository,
  NotificationsRepository,
  SalesRepository,
} from '../../core/repositories';
import { FollowRepository } from '../../core/repositories/follow.repository';
import
{
  CompressResult,
  TMusicCreate,
  TMusicCreateFiles,
  TMusicUpdate,
  TUser,
} from '../../core/types';
import { FileStorageService } from '../../shared/services';

@Injectable()
export class MusicsService
{
  private readonly logger: LoggerService = new Logger(MusicsService.name);
  constructor(
    private readonly musicsRepository: MusicsRepository,
    private readonly salesRepository: SalesRepository,
    private readonly filesRepository: MusicsFilesRepository,
    private readonly fileStorageService: FileStorageService,
    private readonly notificationsRepository: NotificationsRepository,
    private readonly followRepository: FollowRepository,
    private readonly cartRepository: CartRepository,
    private readonly httpService: HttpService,
  ) { }

  public async generateCompressed(): Promise<CompressResult[]>
  {
    this.logger.debug('generating...');

    const nonCompressedMusic = await this.musicsRepository.defaultFindAll({
      attributes: ['id', 'title', 'artistId', 'previewTrack'],
      where: {
        previewCompressedTrack: null,
      },
      limit: 5,
    });

    const batchResults: CompressResult[] = [];
    for (const music of nonCompressedMusic)
    {
      const start = process.hrtime();
      const { data }: { data: Buffer } = await this.httpService.axiosRef(
        music.previewTrack,
        {
          responseType: 'arraybuffer',
        },
      );
      let url = null;

      const compressedFile = await this.musicsRepository.compressFile({
        buffer: data,
        mimetype: 'audio/mpeg',
        originalname: 'demo',
      });
      this.logger.debug({
        size_before: byteToMb(Buffer.byteLength(data)),
        size_after: byteToMb(Buffer.byteLength(compressedFile.buffer)),
      });

      try
      {
        url = await this.fileStorageService.uploadFile(compressedFile, BucketType.MUSIC_COMPRESSED, `${music.artistId}/${music.id}`, null, true);
      } catch (error)
      {
        this.logger.error(error);
      } finally
      {
        const end = process.hrtime(start);
        const elapsedTimeInMilliseconds = end[0] * 1000 + end[1] / 1000000;

        batchResults.push({
          details: {
            id: music.id,
            title: music.title,
            artistId: music.artistId,
            previewTrack: music.previewTrack,
          },
          time: elapsedTimeInMilliseconds,
          status: url ? 'OK' : 'COMPRESS_ERROR',
          url,
        });
      }
    }

    for (const result of batchResults)
    {
      if (result.status === 'OK' && result.details?.id)
      {
        try
        {
          await this.musicsRepository.update(result.details.id, {
            previewCompressedTrack: result.url,
          });
        } catch (error)
        {
          this.logger.error(error);
          result.status = 'SAVE_ERROR';
        }
      }
    }

    return batchResults;
  }

  public async compress(file: Express.Multer.File): Promise<string>
  {
    this.logger.debug('compressing...');
    const compressedFile = await this.musicsRepository.compressFile(file);

    try
    {
      const url = await this.fileStorageService.uploadFile(compressedFile, BucketType.MUSIC_COMPRESSED, `TEST-FOLDER`, null, true);
      return url;
    } catch (error)
    {
      this.logger.error(error);
    }
  }

  public async create(
    data: TMusicCreate,
    files: TMusicCreateFiles,
    user: TUser,
  ): Promise<Music>
  {
    const publishedMusic =
      await this.musicsRepository.countPublishedMusicByUserId(user.id);

    if (user.subscribedUntil < new Date())
    {
      if (publishedMusic.length >= 2)
      {
        throw new ForbiddenException(
          'You can not create more than 2 music with free subscription',
        );
      }
    }

    const { types, categories, instruments, keys, moods, ...musicData } = data;

    const safeTypes = Array.isArray(types) ? types : types ? [types] : [];
    const safeCategories = Array.isArray(categories)
      ? categories
      : categories
        ? [categories]
        : [];
    const safeInstruments = Array.isArray(instruments)
      ? instruments
      : instruments
        ? [instruments]
        : [];
    const safeKeys = Array.isArray(keys) ? keys : keys ? [keys] : [];
    const safeMoods = Array.isArray(moods) ? moods : moods ? [moods] : [];

    const music = await this.musicsRepository.create(musicData, user);

    await this.musicsRepository.createRelations(music.id, {
      types: safeTypes,
      categories: safeCategories,
      instruments: safeInstruments,
      keys: safeKeys,
      moods: safeMoods,
    });

    await this.musicsRepository.createPreviewFiles({
      previewImage: files.previewImage[0],
      previewTrack: files.previewTrack[0],
      userId: user.id,
      musicId: music.id,
    });
    await this.musicsRepository.createFiles({
      mp3: files.mp3[0],
      wav: files.wav ?? [],
      stems: files.stems ?? [],
      mp3Price: musicData.mp3Price,
      wavPrices: musicData.wavPrices
        ? Array.isArray(musicData.wavPrices)
          ? musicData.wavPrices
          : [musicData.wavPrices]
        : [],
      stemsPrices: musicData.stemsPrices
        ? Array.isArray(musicData.stemsPrices)
          ? musicData.stemsPrices
          : [musicData.stemsPrices]
        : [],
      userId: user.id,
      musicId: music.id,
    });
    if (publishedMusic.length === 1)
    {
      await this.notificationsRepository.create({
        type: NotificationType.MUSIC_MAX_PUBLISHED,
        userId: user.id,
        message: NotificationMessages.MUSIC_MAX_PUBLISHED,
        link: `/buy-subscription`,
      });
    }
    return await this.musicsRepository.findOneById(music.id);
  }

  public async update(
    id: number,
    data: Partial<TMusicUpdate>,
    user: TUser,
  ): Promise<Music>
  {
    const music = await this.musicsRepository.findOneById(id);

    if (!music)
    {
      throw new BadRequestException('Music not found');
    }

    if (user.role == Roles.SELLER)
    {
      if (music.artistId != user.id)
      {
        throw new ForbiddenException(
          'You can not update music of other artist',
        );
      } else
      {
        if (
          data.status &&
          data.status === MusicStatus.PUBLISHED &&
          user.subscribedUntil < new Date()
        )
        {
          const publishedMusic =
            await this.musicsRepository.countPublishedMusicByUserId(user.id);
          if (
            publishedMusic.length >= 2 &&
            !publishedMusic.includes(music.id)
          )
          {
            throw new BadRequestException(
              'You can not create more than 2 music with free subscription',
            );
          }
        }
      }
    }

    if (user.role == Roles.ADMIN || user.role == Roles.MODERATOR)
    {
      console.log('Something, something, something, Dark Side', data.status);
      if (data.status && data.status === MusicStatus.APPROVED)
      {
        await this.notificationsRepository.create({
          type: NotificationType.MUSIC_PUBLISHED,
          userId: music.artistId,
          message: NotificationMessages.MUSIC_PUBLISHED(music.title),
          link: `/track/${music.id}`,
        });

        const ids = await this.followRepository.getAllFollowersIdsByFollowerId(
          music.artistId,
        );

        for (const id of ids)
        {
          await this.notificationsRepository.create({
            type: NotificationType.FOLLOWING_USER_ACTION,
            userId: id,
            message: NotificationMessages.FOLLOWING_USER_ACTION({
              name: music.artist.pseudonym,
              title: music.title,
              avatarUrl: music.previewImage || '',
            }),
            link: `/musicians-page/${music.artistId}`,
          });
        }
      }

      if (data.status && data.status === MusicStatus.REJECTED)
      {
        await this.notificationsRepository.create({
          type: NotificationType.MUSIC_DECLINED,
          userId: music.artistId,
          message: NotificationMessages.MUSIC_DECLINED(music.title),
          link: `/my-profile-seller`,
        });
      }
    }

    if (
      (data.status && data.status === MusicStatus.BLOCKED) ||
      data.status === MusicStatus.REJECTED ||
      data.status === MusicStatus.UNPUBLISHED
    )
    {
      await this.cartRepository.deleteAllByFiles(
        music.files.map((file) => file.id),
      );
    }

    const { types, categories, instruments, keys, moods, ...musicData } = data;
    await this.musicsRepository.deleteRelations(id, {
      types,
      categories,
      instruments,
      keys,
      moods,
    });
    await this.musicsRepository.createRelations(id, {
      types,
      categories,
      instruments,
      keys,
      moods,
    });
    return await this.musicsRepository.update(id, musicData);
  }

  public async findOneById(
    id: number,
    user: TUser | undefined,
  ): Promise<Music>
  {
    const music = await this.musicsRepository.findOneById(id);

    if (!music)
    {
      throw new BadRequestException('Music not found');
    }

    if (!user && music.status !== MusicStatus.PUBLISHED)
    {
      throw new ForbiddenException('You have not access to this music');
    }

    if (
      user.role !== Roles.ADMIN &&
      user.role !== Roles.MODERATOR &&
      music.status !== MusicStatus.PUBLISHED
    )
    {
      if (user.id !== music.artistId)
      {
        throw new ForbiddenException('You have not access to this music');
      }
    }
    return music;
  }

  public async findAll(filters: FindOptions): Promise<Music[]>
  {
    try
    {
      filters.where = { ...filters.where, status: MusicStatus.PUBLISHED };
      return await this.musicsRepository.findAll(filters);
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAllMyMusic(
    filters: FindOptions,
    artistId: number,
  ): Promise<Music[]>
  {
    try
    {
      return await this.musicsRepository.findAll({
        ...filters,
        where: { ...filters.where, artistId },
      });
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async downloadMusic(
    fileId: number,
    user: TUser,
  ): Promise<{ url: string }>
  {
    try
    {
      const sale = await this.salesRepository.findOne(fileId, user.id);
      if (!sale)
      {
        throw new ForbiddenException('You have not bought this music yet');
      }

      const file = await this.filesRepository.findOne(fileId);
      const key = this.fileStorageService.getFilePath(file);
      const url = await this.fileStorageService.getFile(BucketType.MUSIC, key);
      return { url };
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }
}
