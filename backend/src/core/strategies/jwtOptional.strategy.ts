import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class JwtOptionalStrategy extends PassportStrategy(
  Strategy,
  'optional',
) {
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
      if (user) return user;
      return;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
