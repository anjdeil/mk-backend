import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTKEY,
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.userRepository.findOneById(payload.id);
      if (!user) {
        throw new UnauthorizedException(
          'You are not authorized to perform the operation',
        );
      }
      if (!user.confirmed) {
        throw new ForbiddenException(
          'You have not confirmed your email address',
        );
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
