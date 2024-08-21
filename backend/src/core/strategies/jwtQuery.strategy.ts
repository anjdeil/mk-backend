import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class JwtQueryStrategy extends PassportStrategy(Strategy, 'jwtQuery') {
  constructor(private readonly userRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTKEY,
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.userRepository.findOneById(payload.id);
      if (!user) {
        throw new BadRequestException(
          'Token expired or not valid. Please, try again.',
        );
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
