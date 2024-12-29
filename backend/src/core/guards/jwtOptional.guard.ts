import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtOptionalAuthGuard extends AuthGuard('optional') {
  handleRequest(err, user, info, context) {
    return user;
  }
}
