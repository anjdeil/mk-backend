import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtOptionalAuthGuard extends AuthGuard('optional') {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest(err, user, info, context) {
    return user;
  }
}
