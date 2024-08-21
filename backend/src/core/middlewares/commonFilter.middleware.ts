import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';

import { processCommonQuery } from '../helpers/modelQuery.helper';
import { AuthRequest } from '../types/common/request';

@Injectable()
export class CommonFilterMiddleware implements NestMiddleware {
  use(req: AuthRequest, res: Response, next: NextFunction) {
    req.filters = processCommonQuery(req?.query);
    next();
  }
}
