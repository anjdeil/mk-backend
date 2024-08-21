import { MusicExtension } from '../enums/files';

export type TCart = {
  id?: number;
  fileId: number;
  title?: string;
  userId?: number;
  artistId?: number;
  previewImage?: string;
  cost?: number;
  artistName?: string;
  fileType?: MusicExtension;
};
