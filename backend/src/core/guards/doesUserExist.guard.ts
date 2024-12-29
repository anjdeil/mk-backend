import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { UsersRepository } from '../repositories';

@Injectable()
export class DoesUserExistGuard implements CanActivate {
  constructor(private readonly userRepository: UsersRepository) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const userExist = await this.userRepository.findOneByEmail(
      request.body.email,
    );
    if (userExist) {
      throw new ForbiddenException('This email already exist');
    }

    const password = request.body.password;

    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;

    const isValid = regex.test(password);
    if (!isValid) {
      throw new BadRequestException('You are trying to set weak password');
    }

    return true;
  }
}
