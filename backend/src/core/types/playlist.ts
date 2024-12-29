import { TDefaultModel } from './common';
import { TMusic } from './music';
import { TUser } from './user';

export type TPlaylist = TDefaultModel & {
  id: number;
  title: string;
  description?: string;
  coverImage?: string;
  public: boolean;
  ownerId: number;
  tracks?: TMusic[];
  owner?: TUser;
};

export type TPlaylistsCreateCoverImage = {
  previewImage: Express.Multer.File;
};
