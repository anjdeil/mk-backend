/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { Op, Sequelize } from 'sequelize';

import { MUSICS_REPOSITORY, USER_REPOSITORY } from '../../core/constants';
import { MusicStatus } from '../../core/enums';
import { Category, Music, MusicFiles, Sales, User } from '../../core/models';
import {musicForPlaylistsInclude} from "../../core/constants/includes";

@Injectable()
export class QueriesService {
  private readonly logger: LoggerService = new Logger(QueriesService.name);
  constructor(
    @Inject(USER_REPOSITORY) private readonly usersRepository: typeof User,
    @Inject(MUSICS_REPOSITORY) private readonly musicsRepository: typeof Music,
  ) {}

  async getTrendingTracks(): Promise<any> {
    return this.musicsRepository.findAll({
      attributes: [
        'id',
        'title',
        'listenCount',
        'previewTrack',
        'previewCompressedTrack',
        'previewImage',
      ],
      include: musicForPlaylistsInclude,
      order: [['listenCount', 'desc']],
      where: {
        status: MusicStatus.PUBLISHED,
      },
      limit: 5,
    });
  }

  async getPremiumTracks(): Promise<any> {
    return this.musicsRepository.findAll({
      attributes: [
        'id',
        'title',
        'listenCount',
        'previewTrack',
        'previewCompressedTrack',
        'previewImage',
        'createdAt',
      ],
      include: musicForPlaylistsInclude,
      order: [['createdAt', 'desc']],
      where: {
        status: MusicStatus.PUBLISHED,
      },
      limit: 5,
    });
  }

  async getUserTracks(
    artistId: number,
    pagination: { offset: number; limit: number },
  ): Promise<any> {
    try {
      let baseQuery = `
      SELECT
            m.id,
            m.title,
            m."listenCount",
            m."previewImage",
            m."createdAt",
            m.status,
            ARRAY_AGG(DISTINCT jsonb_build_object(
                'id', f.id, 
                'title', f.title, 
                'url', f.url, 
                'type', f.type, 
                'cost', f.cost, 
                'musicId', f."musicId", 
                'userId', f."userId", 
                'createdAt', f."createdAt", 
                'updatedAt', f."updatedAt"
            )) AS files,
            ARRAY_AGG(DISTINCT jsonb_build_object('id', c.id, 'name', c.name)) AS categories,
            COUNT(DISTINCT s.id) AS "purchaseCount"

        FROM
            musics m
        
        LEFT JOIN
            files f ON m.id = f."musicId"
        LEFT JOIN
            sales s ON f.id = s."fileId"
        LEFT JOIN
            "music-categories" mc ON m.id = mc."musicId"
        LEFT JOIN
            categories c ON mc."categoryId" = c.id
        WHERE
            m."artistId" = :artistId AND
            m.status = 'published'
        GROUP BY
            m.id
        ORDER BY
            m."createdAt" DESC
    `;

      if (pagination.limit !== undefined) {
        baseQuery += ` LIMIT :limit`;
      }

      if (pagination.offset !== undefined) {
        baseQuery += ` OFFSET :offset`;
      }

      const [results, _] = await this.musicsRepository.sequelize.query(
        baseQuery,

        {
          replacements: {
            artistId: artistId,
            ...pagination,
          },
        },
      );

      return results;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getFeaturedTracks(
    artistId: number,
    categories: number[],
  ): Promise<any> {
    return this.musicsRepository.findAll({
      where: {
        artistId: { [Op.ne]: artistId },
      },
      attributes: [
        'id',
        'title',
        'listenCount',
        'previewTrack',
        'previewCompressedTrack',
        'previewImage',
      ],
      include: [
        {
          model: Category,
          attributes: ['id', 'name'],
          where: { id: { [Op.in]: categories } },
          through: {
            attributes: [],
          },
        },
        {
          model: User,
          as: 'artist',
          attributes: ['id', 'name'],
        },
        {
          model: MusicFiles,
          as: 'files',
          attributes: ['id', 'type', 'cost']
        },
      ],
      // order: [['listenCount', 'desc']],
      limit: 5,
    });
  }
}
