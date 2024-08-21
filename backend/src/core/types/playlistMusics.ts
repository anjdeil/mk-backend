import { TMusic } from './music';
import { TPlaylist } from './playlist';

export type TPlaylistMusic = {
  playlistId: number;
  musicId: number;
  playlist?: TPlaylist;
  musicFile?: TMusic;
};
