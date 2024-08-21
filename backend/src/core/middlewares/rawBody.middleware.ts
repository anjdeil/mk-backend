import { IncomingMessage } from 'http';

import { json } from 'body-parser';
import { Response } from 'express';

export interface RequestWithRawBody extends IncomingMessage {
  rawBody: Buffer;
}

function rawBodyMiddleware() {
  return json({
    verify: (
      request: RequestWithRawBody,
      response: Response,
      buffer: Buffer,
    ) => {
      if (request.url === '/webhook' && Buffer.isBuffer(buffer)) {
        request.rawBody = Buffer.from(buffer);
      }
      return true;
    },
  });
}

export default rawBodyMiddleware;
