import { Request } from 'express';
import { FindOptions } from 'sequelize';

import { TUser } from '../user';

export type AuthRequest = Request & {
  user: TUser;
  filters: FindOptions;
};
