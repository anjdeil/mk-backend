import
{
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { Lame } from 'node-lame';
import { FindOptions, Op, Optional, Sequelize } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/lib/utils';

import { FileStorageService } from '../../shared/services';
import
{
  MUSICS_REPOSITORY,
  MUSIC_CATEGORIES_REPOSITORY,
  MUSIC_FILES_REPOSITORY,
  MUSIC_INSTRUMENTS_REPOSITORY,
  MUSIC_KEYS_REPOSITORY,
  MUSIC_MOODS_REPOSITORY,
  MUSIC_TYPES_REPOSITORY,
  SALES_REPOSITORY,
} from '../constants';
import
{
  fullMusicGroupBy,
  historyGroupBy,
  musicGroupBy,
} from '../constants/groupBy';
import { musicInclude } from '../constants/includes';
import { musicOrderFields } from '../constants/search';
import { BucketType, MusicExtension } from '../enums/files';
import { MusicStatus } from '../enums/musics';
import { getRelevanceTimeRange } from '../helpers/relevance.helper';
import Category from '../models/category.entity';
import MusicsFavorites from '../models/favorites.entity';
import MusicsHistory from '../models/history.entity';
import Instrument from '../models/instrument.entity';
import Key from '../models/key.entity';
import Mood from '../models/mood.entity';
import Music from '../models/music.entity';
import MusicCategories from '../models/musicCategories.entity';
import MusicFiles from '../models/musicFiles.entity';
import MusicIntruments from '../models/musicInstruments.entity';
import MusicKeys from '../models/musicKeys.entity';
import MusicMoods from '../models/musicMoods.entity';
import MusicTypes from '../models/musicTypes.entity';
import Sales from '../models/sales.entity';
import TrackType from '../models/trackType.entity';
import User from '../models/user.entity';
import { SearchFilters } from '../types';
import
{
  CompressedFile,
  TMusic,
  TMusicCreate,
  TMusicCreateRelations,
} from '../types/music';
import { TUser } from '../types/user';

@Injectable()
export class MusicsRepository
{
  private readonly logger: LoggerService = new Logger(MusicsRepository.name);

  constructor(
    @Inject(MUSICS_REPOSITORY)
    private readonly musicsRepository: typeof Music,
    @Inject(MUSIC_CATEGORIES_REPOSITORY)
    private readonly musicCategories: typeof MusicCategories,
    @Inject(MUSIC_TYPES_REPOSITORY)
    private readonly musicTypes: typeof MusicTypes,
    @Inject(MUSIC_KEYS_REPOSITORY)
    private readonly musicKeys: typeof MusicKeys,
    @Inject(MUSIC_INSTRUMENTS_REPOSITORY)
    private readonly musicInstruments: typeof MusicIntruments,
    @Inject(MUSIC_MOODS_REPOSITORY)
    private readonly musicMoods: typeof MusicMoods,
    @Inject(MUSIC_FILES_REPOSITORY)
    private readonly musicFiles: typeof MusicFiles,
    @Inject(SALES_REPOSITORY)
    private readonly salesRepository: typeof Sales,
    private readonly fileStorageService: FileStorageService,
  ) { }

  public async create(
    data: Optional<TMusicCreate, NullishPropertiesOf<TMusicCreate>>,
    user: TUser,
  ): Promise<Music>
  {
    try
    {
      data.artistId = user.id;
      const music = await this.musicsRepository.create(data);
      console.log(music);
      return music;
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async createRelations(
    musicId: number,
    data: TMusicCreateRelations,
  ): Promise<boolean>
  {
    try
    {
      const { categories, moods, keys, instruments, types } = data;

      const promiseArray = [];
      if (Array.isArray(categories))
      {
        promiseArray.push(
          this.musicCategories.bulkCreate(
            categories.map((categoryId) => ({ categoryId, musicId })),
          ),
        );
      } else if (categories)
      {
        promiseArray.push(
          this.musicCategories.bulkCreate([
            { categoryId: categories, musicId },
          ]),
        );
      }

      if (Array.isArray(moods))
      {
        promiseArray.push(
          this.musicMoods.bulkCreate(
            moods.map((moodId) => ({ moodId, musicId })),
          ),
        );
      } else if (moods)
      {
        promiseArray.push(
          this.musicMoods.bulkCreate([{ moodId: moods, musicId }]),
        );
      }

      if (Array.isArray(keys))
      {
        promiseArray.push(
          this.musicKeys.bulkCreate(keys.map((keyId) => ({ keyId, musicId }))),
        );
      } else if (keys)
      {
        promiseArray.push(this.musicKeys.create({ keyId: keys, musicId }));
      }

      if (Array.isArray(instruments))
      {
        promiseArray.push(
          this.musicInstruments.bulkCreate(
            instruments.map((instrumentId) => ({ instrumentId, musicId })),
          ),
        );
      } else if (instruments)
      {
        promiseArray.push(
          this.musicInstruments.bulkCreate([
            { instrumentId: instruments, musicId },
          ]),
        );
      }

      if (Array.isArray(types))
      {
        promiseArray.push(
          this.musicTypes.bulkCreate(
            types.map((typeId) => ({ typeId, musicId })),
          ),
        );
      } else if (types)
      {
        promiseArray.push(
          this.musicTypes.bulkCreate([{ typeId: types, musicId }]),
        );
      }

      promiseArray.push(
        this.musicsRepository.update<Music>(
          {
            moodIds: moods,
            instrumentIds: instruments,
            keyIds: keys,
            typeIds: types,
            categoryIds: categories,
          },
          { where: { id: musicId } },
        ),
      );

      await Promise.all(promiseArray);
      console.log('PROMISE');
      return true;
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async deleteRelations(
    musicId: number,
    data: Partial<TMusicCreateRelations>,
  ): Promise<void>
  {
    try
    {
      const { categories, moods, keys, instruments, types } = data;
      const promiseArray = [];
      console.log('categories :>> ', categories);
      if (categories)
      {
        console.log('test :>> ');
        promiseArray.push(
          this.musicCategories.destroy({
            where: { musicId, categoryId: categories },
          }),
        );
      }

      if (moods)
      {
        promiseArray.push(
          this.musicMoods.destroy({
            where: { musicId, moodId: moods },
          }),
        );
      }

      if (keys)
      {
        promiseArray.push(
          this.musicKeys.destroy({
            where: { musicId, keyId: keys },
          }),
        );
      }

      if (instruments)
      {
        promiseArray.push(
          this.musicInstruments.destroy({
            where: { musicId, instrumentId: instruments },
          }),
        );
      }

      if (types)
      {
        promiseArray.push(
          this.musicTypes.destroy({
            where: { musicId, typeId: types },
          }),
        );
      }

      promiseArray.push(
        this.musicsRepository.update<Music>(
          {
            moodIds: null,
            instrumentIds: null,
            keyIds: null,
            typeIds: null,
            categoryIds: null,
          },
          { where: { id: musicId } },
        ),
      );

      await Promise.all(promiseArray);
      return;
    } catch (error)
    {
      console.log('error :>> ', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  public async createPreviewFiles(data: {
    previewImage: Express.Multer.File;
    previewTrack: Express.Multer.File;
    userId: number;
    musicId: number;
  }): Promise<boolean>
  {
    try
    {
      const { previewImage, previewTrack, userId, musicId } = data;
      const previewImageUrl = await this.fileStorageService.uploadFile(previewImage, BucketType.PREVIEW, `${userId}/${musicId}`, 'cover', true);
      console.log(previewImageUrl);
      const previewTrackUrl = await this.fileStorageService.uploadFile(previewTrack, BucketType.PREVIEW, `${userId}/${musicId}`, 'demo', true);
      console.log(previewTrackUrl);
      // TODO delete if streaming enabled
      let previewCompressedTrackUrl: string;
      try
      {
        const compressedFile = await this.compressFile(previewTrack);
        previewCompressedTrackUrl = await this.fileStorageService.uploadFile(compressedFile, BucketType.MUSIC_COMPRESSED, `${userId}/${musicId}`, 'demo', true);
      } catch (error)
      {
        this.logger.debug(error);
      }
      // end TODO

      console.log(previewCompressedTrackUrl);

      await this.musicsRepository.update<Music>(
        {
          previewImage: previewImageUrl,
          previewTrack: previewTrackUrl,
          previewCompressedTrack: previewCompressedTrackUrl,
        },
        { where: { id: musicId } },
      );
      return true;
    } catch (error)
    {
      this.logger.debug(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async compressFile(
    file: Pick<Express.Multer.File, 'buffer' | 'originalname' | 'mimetype'>,
    bitrate: 64 | 80 | 96 | 128 = 96,
  ): Promise<CompressedFile>
  {
    if (!file)
    {
      throw new Error('No file provided');
    }

    try
    {
      const encoder = new Lame({
        output: 'buffer',
        bitrate: bitrate,
        mp3Input: true,
      }).setBuffer(file.buffer);

      await encoder.encode();
      const compressedFileBuffer = encoder.getBuffer();
      const compressedFileName = `${file.originalname.split('.')[0]
        }-compressed-${bitrate}.mp3`;

      return {
        mimetype: file.mimetype,
        originalname: compressedFileName,
        buffer: compressedFileBuffer,
      };
    } catch (error)
    {
      this.logger.error('Error compressing the file:', error);
      throw error;
    }
  }

  public async createFiles(data: {
    mp3: Express.Multer.File;
    wav: Express.Multer.File[];
    stems: Express.Multer.File[];
    mp3Price: number;
    wavPrices: number[];
    stemsPrices: number[];
    userId: number;
    musicId: number;
  }): Promise<boolean>
  {
    try
    {
      const {
        mp3,
        wav,
        stems,
        mp3Price,
        wavPrices,
        stemsPrices,
        userId,
        musicId,
      } = data;

      const mp3Url = await this.fileStorageService.uploadFile(mp3, BucketType.MUSIC, `${userId}/${musicId}`, null);

      const wavUrls = await Promise.all(
        wav?.map((file) =>
          this.fileStorageService.uploadFile(file, BucketType.MUSIC, `${userId}/${musicId}`, null),
        ),
      );

      const stemsUrls = await Promise.all(
        stems?.map((file) =>
          this.fileStorageService.uploadFile(file, BucketType.MUSIC, `${userId}/${musicId}`, null),
        ),
      );

      await this.musicFiles.create({
        url: mp3Url,
        musicId,
        cost: mp3Price,
        type: MusicExtension.MP3,
        userId,
        title: mp3.originalname,
      });

      await this.musicFiles.bulkCreate(
        wavUrls.map((url, index) => ({
          url,
          musicId,
          cost: wavPrices[index],
          type: MusicExtension.WAV,
          userId,
          title: wav[index].originalname,
        })),
      );

      await this.musicFiles.bulkCreate(
        stemsUrls.map((url, index) => ({
          url,
          musicId,
          cost: stemsPrices[index],
          type: MusicExtension.STEMS,
          userId,
          title: stems[index].originalname,
        })),
      );

      return true;
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async update(id: number, data: Partial<TMusic>): Promise<Music>
  {
    try
    {
      const [, [updatedMusic]] = await this.musicsRepository.update<Music>(
        data,
        {
          where: { id },
          returning: true,
        },
      );
      return updatedMusic;
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async updateRelations(
    musicId: number,
    data: TMusicCreateRelations,
  ): Promise<boolean>
  {
    try
    {
      const { categories, moods, keys, instruments, types } = data;

      if (categories && categories.length > 0)
      {
        await this.musicCategories.destroy({ where: { musicId } });
        await this.musicCategories.bulkCreate(
          categories.map((categoryId) => ({ categoryId, musicId })),
        );
      }

      if (moods && moods.length > 0)
      {
        await this.musicMoods.destroy({ where: { musicId } });
        await this.musicMoods.bulkCreate(
          moods.map((moodId) => ({ moodId, musicId })),
        );
      }

      if (keys && keys.length > 0)
      {
        await this.musicKeys.destroy({ where: { musicId } });
        await this.musicKeys.bulkCreate(
          keys.map((keyId) => ({ keyId, musicId })),
        );
      }

      if (instruments && instruments.length > 0)
      {
        await this.musicInstruments.destroy({ where: { musicId } });
        await this.musicInstruments.bulkCreate(
          instruments.map((instrumentId) => ({ instrumentId, musicId })),
        );
      }

      if (types && types.length > 0)
      {
        await this.musicTypes.destroy({ where: { musicId } });
        await this.musicTypes.bulkCreate(
          types.map((typeId) => ({ typeId, musicId })),
        );
      }

      return true;
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneById(id: number): Promise<Music>
  {
    try
    {
      const music = await this.musicsRepository.findOne<Music>({
        where: { id },
        include: musicInclude,
      });
      if (!music)
      {
        throw new BadRequestException('Music not found');
      }
      const favoritesCount = await MusicsFavorites.count({
        where: { musicId: music.id },
      });
      const historyCount = await MusicsHistory.count({
        where: { musicId: music.id },
      });
      const purchaseCount = await this.salesRepository.count({
        where: { fileId: music.files.map((file) => file.id) },
      });
      music.setDataValue('favoritesCount', favoritesCount);
      music.setDataValue('historyCount', historyCount);
      music.setDataValue('purchaseCount', purchaseCount);

      return music;
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async defaultFindAll(filters: FindOptions): Promise<Music[]>
  {
    try
    {
      return await this.musicsRepository.findAll<Music>(filters);
    } catch (error)
    {
      this.logger.debug(error);
      throw error;
    }
  }

  public async findAll(filters: FindOptions): Promise<Music[]>
  {
    try
    {
      const musics = await this.musicsRepository.findAll<Music>({
        ...filters,
        include: musicInclude,
      });
      return musics.map((music) =>
      {
        const favoritesCount = music.getDataValue('favorites').length;
        const historyCount = music.getDataValue('history').length;
        let purchaseCount = 0;
        music.setDataValue(
          'files',
          music.getDataValue('files').map((file) =>
          {
            purchaseCount += file.sales.length;
            file['dataValues'].sales = undefined;
            return file;
          }),
        );
        music.setDataValue('favoritesCount', favoritesCount);
        music.setDataValue('listenCount', historyCount);
        music.setDataValue('purchaseCount', purchaseCount);
        music.setDataValue('favorites', undefined);
        music.setDataValue('history', undefined);
        return music;
      });
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async countPublishedMusicByUserId(userId: number): Promise<Music[]>
  {
    try
    {
      return await this.musicsRepository.findAll({
        attributes: ['id'],
        where: { artistId: userId, status: MusicStatus.PUBLISHED },
      });
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async blockMusicsByUserId(userId: number): Promise<void>
  {
    try
    {
      const musics = await this.musicsRepository.findAll<Music>({
        where: { artistId: userId },
      });
      const ids = musics.map((music) => music.id).slice(2, musics.length - 1);
      await this.musicsRepository.update(
        { status: MusicStatus.BLOCKED },
        {
          where: {
            id: {
              [Op.in]: ids,
            },
          },
        },
      );
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async unblockMusicsByUserId(userId: number)
  {
    try
    {
      return await this.musicsRepository.update(
        { status: MusicStatus.APPROVED },
        { where: { artistId: userId, status: MusicStatus.BLOCKED } },
      );
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async incrementCounts(field, musicId): Promise<void>
  {
    try
    {
      await this.musicsRepository.increment(field, { where: { id: musicId } });
      return;
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async searchMusics(options): Promise<Music[]>
  {
    try
    {
      const order = [];
      let where: any = {
        status: MusicStatus.PUBLISHED,
      };
      let userWhere = {};
      let relevanceRange: Date;

      if (options.order)
      {
        if (musicOrderFields.includes(options.order[0][0]))
        {
          order.push([options.order[0]]);
        }
      } else
      {
        order.push(['listenCount', 'DESC']);
      }

      const {
        categories,
        instruments,
        keys,
        moods,
        types,
        cost,
        relevance,
        ...filters
      } = options.filters || {};

      if (filters)
      {
        for (const [key, value] of Object.entries(filters))
        {
          if (musicOrderFields.includes(key))
          {
            where = {
              ...where,
              [key]: value,
            };
          } else
          {
            userWhere = {
              ...userWhere,
              [key]: value,
            };
          }
        }
      }

      if (options.search)
      {
        where = {
          ...where,
          [Op.or]: options.search.fields.map((item) =>
          {
            if (musicOrderFields.includes(item))
            {
              return {
                [item]: { [Op.iLike]: `%${options.search.value}%` },
              };
            }
          }),
        };
      }

      const includes = [
        {
          model: Category,
          ...(categories && {
            where: {
              id: categories,
            },
          }),
          required: true,
        },
        {
          model: Instrument,
          ...(instruments && {
            where: {
              id: instruments,
            },
          }),
          required: true,
        },
        {
          model: Key,
          ...(keys && {
            where: {
              id: keys,
            },
          }),
          required: true,
        },
        {
          model: Mood,
          ...(moods && {
            where: {
              id: moods,
            },
          }),
          required: true,
        },
        {
          model: TrackType,
          ...(types && {
            where: {
              id: types,
            },
          }),
          required: true,
        },
        {
          model: MusicFiles,
          attributes: ['id', 'cost', 'type'],
          ...(cost
            ? {
              where: {
                cost,
              },
            }
            : {}),
          required: true,
          as: 'files',
        },
        {
          model: MusicsHistory,
          ...(relevanceRange && {
            where: {
              createdAt: {
                [Op.gte]: relevanceRange,
              },
            },
          }),
          required: false,
        },
        {
          model: User,
          attributes: ['id', 'name', 'avatar', 'pseudonym'],
          as: 'artist',
          where: userWhere,
          required: true,
        },
      ];

      if (relevance)
      {
        relevanceRange = getRelevanceTimeRange(relevance);
      }

      console.log({ where });
      this.logger.debug('==== SEARCH OLD END ========');

      const { count, rows: musics } =
        await this.musicsRepository.findAndCountAll({
          attributes: {
            include: [
              [
                Sequelize.fn('COUNT', Sequelize.col('history.userId')),
                'listenCount',
              ],
            ],
            exclude: [
              'listenCount',
              'categoryIds',
              'moodIds',
              'typeIds',
              'instrumentIds',
              'keyIds',
            ],
          },
          order,
          include: includes,
          distinct: true,
          where,
          group: fullMusicGroupBy,
        });

      return musics;
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async searchMusics2(options: any, plainFilters: SearchFilters)
  {
    try
    {
      const order = [];
      let where: any = {
        status: MusicStatus.PUBLISHED,
      };
      let userWhere = {};
      let relevanceRange: Date;

      if (options.order)
      {
        if (musicOrderFields.includes(options.order[0][0]))
        {
          order.push([options.order[0]]);
        }
      }
      // } else {
      //   order.push(['listenCount', 'DESC']);
      // }

      const { cost, relevance, ...filters } = options.filters || {};

      this.logger.debug(options.filters);

      if (filters)
      {
        for (const [key, value] of Object.entries(filters))
        {
          if (
            ['categories', 'instruments', 'keys', 'moods', 'types'].includes(
              key,
            )
          )
            continue;

          if (musicOrderFields.includes(key))
          {
            where = {
              ...where,
              [key]: value,
            };
          } else
          {
            userWhere = {
              ...userWhere,
              [key]: value,
            };
          }
        }
      }
      if (options.search)
      {
        where = {
          ...where,
          [Op.or]: options.search.fields.map((item) =>
          {
            if (musicOrderFields.includes(item))
            {
              return {
                [item]: { [Op.iLike]: `%${options.search.value}%` },
              };
            }
          }),
        };
      }
      if (plainFilters)
      {
        const { categories, instruments, keys, moods, types } = plainFilters;

        const plainFilterMapping: { field: string; values: any | any[] }[] = [
          {
            field: 'categoryIds',
            values: categories,
          },
          {
            field: 'instrumentIds',
            values: instruments,
          },
          { field: 'keyIds', values: keys },
          { field: 'moodIds', values: moods },
          { field: 'typeIds', values: types },
        ];
        const filterMapping: { field: string; values: number | number[] }[] =
          [];
        for (const filter of plainFilterMapping)
        {
          if (filter.values)
          {
            filterMapping.push({
              field: filter.field,
              values:
                typeof filter.values === 'string'
                  ? [parseInt(filter.values, 10)]
                  : filter.values?.map((str) => parseInt(str, 10)),
            });
          }
        }

        const whereFilters = [];

        for (const filter of filterMapping)
        {
          if (filter.values)
          {
            whereFilters[filter.field] = { [Op.contains]: filter.values };
          }
        }
        if (whereFilters)
        {
          where = { ...where, ...whereFilters };
        }
      }

      const includes = [
        {
          model: Category,
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
          required: true,
        },
        {
          model: MusicFiles,
          attributes: ['id', 'cost', 'type'],
          // ...(cost
          //   ? {
          //       where: {
          //         cost,
          //       },
          //     }
          //   : {}),
          required: true,
          as: 'files',
        },
        {
          model: MusicsHistory,
          ...(relevanceRange && {
            where: {
              createdAt: {
                [Op.gte]: relevanceRange,
              },
            },
          }),
          required: true,
        },
        {
          model: User,
          attributes: ['id', 'name', 'avatar', 'pseudonym'],
          as: 'artist',
          where: userWhere,
          required: true,
        },
      ];

      if (relevance)
      {
        relevanceRange = getRelevanceTimeRange(relevance);
      }

      const { count, rows } =
        await this.musicsRepository.findAndCountAll({
          attributes: {
            exclude: [
              'listenCount',
              'categoryIds',
              'moodIds',
              'typeIds',
              'instrumentIds',
              'keyIds',
            ],
          },
          order,
          where: { ...where, status: MusicStatus.PUBLISHED },
          distinct: true,
          limit: +options.limit,
          offset: +options.offset,
          include: includes,
        });

      const allPrices = rows.flatMap((item) => item.files.map((file) => file.cost));
      // const maxPrice = allPrices.length > 0 ? Math.max(...allPrices) : 0;
      const maxPrice = cost;
      const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;
      console.log('SSSSSS', rows);
      const musics = rows.filter((music) =>
        music.files.some((file) =>
          file.cost >= cost.gte && file.cost <= cost.lte
        )
      );
      // const musics = rows;

      return { musics, count, maxPrice, minPrice };
    } catch (error)
    {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
