import
{
  Injectable,
  InternalServerErrorException,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { FindOptions } from 'sequelize';

import { SearchFiltersDto } from '../../core/dto';
import
{
  processCommonQueryWithoutSearch,
  processFilters,
} from '../../core/helpers';
import
{
  MusicsRepository,
  PlaylistsRepository,
  UsersRepository,
} from '../../core/repositories';
import { TMusic } from '../../core/types';

@Injectable()
export class SearchService
{
  private readonly logger: LoggerService = new Logger(SearchService.name);

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly musicRepository: MusicsRepository,
    private readonly playlistsRepository: PlaylistsRepository,
  ) { }

  async search2(options: SearchFiltersDto): Promise<any>
  {
    try
    {
      const { filters, target, ...queryoptions } = options;
      this.logger.debug({
        filters,
        target,
        queryoptions,
      });
      const proccessedFilters = processFilters(filters || {});
      const proccessedQuery: FindOptions<TMusic> = processCommonQueryWithoutSearch(queryoptions, proccessedFilters);

      const result: {
        users?: { data: any[]; count: number };
        musics?: {
          priceRange: { maxPrice: number; minPrice: number; };
          data: any[];
          count: number
        };
        playlists?: { data: any[]; count: number };
      } = {
        users: { data: [], count: 0 },
        musics: { data: [], count: 0, priceRange: { maxPrice: 0, minPrice: 0 } },
        playlists: { data: [], count: 0 },
      };

      if (!target || target === 'users')
      {
        const { users, count } = await this.usersRepository.searchUsers(proccessedQuery);
        result.users.data = users.map((user) => ({
          ...user['dataValues'],
        }));
        result.users.count = count;
      }

      if (!target || target === 'musics')
      {
        const { musics, count, maxPrice, minPrice } = await this.musicRepository.searchMusics2(proccessedQuery, filters);

        if (musics.length > 0)
        {
          // const allPrices = musics.flatMap((item) => item.files.map((file) => file.cost));

          // Ensure allPrices is not empty
          // const maxPrice = allPrices.length > 0 ? Math.max(...allPrices) : 0;
          // const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;

          result.musics.data = musics.map((item) => ({
            ...item['dataValues'],
          }));

          result.musics.priceRange = { maxPrice, minPrice };
        } else
        {
          result.musics.priceRange = { maxPrice: 0, minPrice: 0 };
        }

        result.musics.count = count;
      }

      if (!target || target === 'playlists')
      {
        const { playlists, count } = await this.playlistsRepository.searchPlaylists(proccessedQuery, proccessedQuery.limit, proccessedQuery.offset);
        result.playlists.data = playlists.map((item) => ({
          ...item['dataValues'],
        }));
        result.playlists.count = count;
      }

      return result;
    } catch (error)
    {
      this.logger.error('An error occurred while searching', error.stack);
      throw new InternalServerErrorException(error.message);
    }
  }

  // async search(options: SearchFiltersDto): Promise<any> {
  //   try {
  //     const { filters, target, ...queryoptions } = options;
  //     const proccessedFilters = processFilters(filters || {});
  //     const proccessedQuery = processCommonQueryWithoutSearch(
  //       queryoptions,
  //       proccessedFilters,
  //     );
  //
  //     const result: { users?: { data?: User[], count?: number }; musics?: { data?: any[], count?: number } } = {};
  //
  //     if (!target || target === 'users') {
  //       const { users } = await this.usersRepository.searchUsers(proccessedQuery);
  //       result.users.data = users.map((user) => {
  //         return {
  //           ...user['dataValues'],
  //         };
  //       });
  //     }
  //
  //     if (!target || target === 'musics') {
  //       const musics = await this.musicRepository.searchMusics(proccessedQuery);
  //       result.musics.data = musics.map((item) => {
  //         return {
  //           ...item['dataValues'],
  //           historyCount: item['dataValues'].history.length,
  //           history: undefined,
  //         };
  //       });
  //     }
  //
  //     return result;
  //   } catch (error) {
  //     throw new InternalServerErrorException(error.message);
  //   }
  // }
}
