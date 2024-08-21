import { Inject, Injectable } from '@nestjs/common';
import { Op, Sequelize, QueryTypes } from 'sequelize';

import { PLAYLIST_FOLLOWS_REPOSITORY, PLAYLIST_REPOSITORY } from '../constants';
import { musicForPlaylistsInclude } from '../constants/includes';
import { Music, Playlist } from '../models';
import PlaylistFollow from '../models/playlistFollow.entity';

@Injectable()
export class PlaylistFollowRepository {
  constructor(
    @Inject(PLAYLIST_FOLLOWS_REPOSITORY)
    private readonly playlistFollowModel: typeof PlaylistFollow,
    @Inject(PLAYLIST_REPOSITORY)
    private readonly playlistModel: typeof Playlist,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
  ) {}

  async followPlaylist(
    userId: number,
    playlistId: number,
  ): Promise<PlaylistFollow> {
    return await this.playlistFollowModel.create({ userId, playlistId });
  }

  async unfollowPlaylist(userId: number, playlistId: number): Promise<void> {
    await this.playlistFollowModel.destroy({ where: { userId, playlistId } });
  }

  async getPlaylistFollowers(playlistId: number): Promise<number[]> {
    const followers = await this.playlistFollowModel.findAll({
      where: { playlistId },
      attributes: ['userId'],
      raw: true,
    });

    return followers.map((follower) => follower.userId);
  }

  async getFollowedPlaylists(
    userId: number,
    offset = 0,
    limit = 10,
  ): Promise<{ playlists: any[]; count: number }> {
    const query = `
  SELECT
    p.id,
    p.title,
    p.description,
    p."coverImage",
    p."ownerId",
    p.public,
    p."createdAt",
    p."updatedAt",
    (
      SELECT json_agg(
        json_build_object(
          'id', m.id,
          'title', m.title,
          'description', m.description,
          'requirements', m.requirements,
          'previewImage', m."previewImage",
          'previewTrack', m."previewTrack",
          'previewCompressedTrack', m."previewCompressedTrack",
          'duration', m.duration,
          'bpm', m.bpm,
          'listenCount', m."listenCount",
          'downloadCount', m."downloadCount",
          'status', m.status,
          'moodIds', m."moodIds",
          'instrumentIds', m."instrumentIds",
          'keyIds', m."keyIds",
          'typeIds', m."typeIds",
          'categoryIds', m."categoryIds",
          'createdAt', m."createdAt",
          'updatedAt', m."updatedAt"
        )
      )
      FROM "musics" m
      JOIN "playlist-musics" pm ON pm."musicId" = m.id
      WHERE pm."playlistId" = p.id
    ) AS "musics",
    (
      SELECT json_agg(pf2."userId")
      FROM "playlist_follows" pf2
      WHERE pf2."playlistId" = p.id
    ) AS "followers"
  FROM "playlist_follows" pf
  JOIN "playlists" p ON p.id = pf."playlistId"
  WHERE pf."userId" = :userId
    AND p.public = true
  GROUP BY p.id, p.title, p.description, p."coverImage", p."ownerId", p.public, p."createdAt", p."updatedAt"
  OFFSET :offset
  LIMIT :limit
`;

    const countQuery = `
  SELECT COUNT(*)
  FROM "playlist_follows" pf
  JOIN "playlists" p ON p.id = pf."playlistId"
  WHERE pf."userId" = :userId
    AND p.public = true
`;

    const playlists = await this.sequelize.query(query, {
      replacements: { userId, offset, limit },
      type: QueryTypes.SELECT,
    });

    const countResult = await this.sequelize.query(countQuery, {
      replacements: { userId },
      type: QueryTypes.SELECT,
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const count = parseInt(countResult[0]?.count, 10);

    return { playlists, count };
  }
}
