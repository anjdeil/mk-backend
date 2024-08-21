import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { RESET_PASSWORD_REPOSITORY } from '../constants';
import { CreateResetPasswordDto, UpdateResetPasswordDto } from '../dto';
import { ResetPassword } from '../models';

@Injectable()
export class ResetPasswordRepository {
  constructor(
    @Inject(RESET_PASSWORD_REPOSITORY)
    private readonly resetPasswordRepository: typeof ResetPassword,
  ) {}

  public async findOneByToken(token: string): Promise<ResetPassword> {
    try {
      return await this.resetPasswordRepository.findOne<ResetPassword>({
        where: { token },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async create(data: CreateResetPasswordDto): Promise<ResetPassword> {
    try {
      return await this.resetPasswordRepository.create<ResetPassword>(data);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async patch(
    token: string,
    data: UpdateResetPasswordDto,
  ): Promise<[number]> {
    try {
      return await this.resetPasswordRepository.update<ResetPassword>(data, {
        where: { token },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
