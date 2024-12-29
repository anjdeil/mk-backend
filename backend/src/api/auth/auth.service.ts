import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  LoggerService,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../../core/models';
import {
  ResetPasswordRepository,
  SettingsRepository,
  UsersRepository,
} from '../../core/repositories';
import { getConfirmEmailTemplate } from '../../core/templates/confirmEmailTemplate';
import { getForgotPasswordTemplate } from '../../core/templates/forgotPasswordTemplate';
import { getRegistrationTemplate } from '../../core/templates/registrationTemplate';
import { getRegistrationWithoutPasswordTemplate } from '../../core/templates/registrationWithoutPasswordTemplate';
import { TUser } from '../../core/types';
import { EmailService } from '../../shared/services';

@Injectable()
export class AuthService {
  private readonly logger: LoggerService = new Logger(AuthService.name);

  constructor(
    private readonly userRepository: UsersRepository,
    private readonly resetPasswordRepository: ResetPasswordRepository,
    private readonly settingsRepository: SettingsRepository,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  private async validateUser(email: string, pass: string): Promise<TUser> {
    try {
      const user = await this.userRepository.findOneByEmail(email);
      if (!user) {
        return null;
      }

      const match = await this.comparePassword(pass, user.password);
      if (!match) {
        return null;
      }

      const { password, ...result } = user['dataValues'];

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async login(data: {
    email: string;
    password: string;
  }): Promise<{ user: TUser; token: string; refreshToken: string }> {
    try {
      const user = await this.validateUser(data.email, data.password);
      if (!user) {
        throw new UnauthorizedException(
          'Unable to sign in with provided credentials. Please check your details and try again.',
        );
      } else if (!user.confirmed) {
        throw new ForbiddenException(
          'You have not confirmed your email address',
        );
      }

      const token = await this.generateToken(user);
      const refreshToken = await this.generateRefresToken({ id: user.id });

      return { user, token, refreshToken };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async create(data: {
    email: string;
    password: string;
    name: string;
  }): Promise<void> {
    try {
      if (await this.userRepository.findOneByEmail(data.email)) {
        await this.userRepository.deleteByEmail(data.email);
      }
      const pass = await this.hashPassword(data.password);
      const user = await this.userRepository.create({
        ...data,
        password: pass,
      });

      const token = await this.generateToken({ id: user.id });
      await this.createSettings(user.id);
      await this.emailService.sendEmail(
        user.email,
        getConfirmEmailTemplate({
          name: user.name,
          link: `${process.env.FRONTEND_URL}/verifyemail/${token}`,
        }),
      );
      return;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async createWithoutPassword({ email, name, stripeId }): Promise<User> {
    try {
      const isExist = await this.userRepository.findOneByEmail(email);

      if (isExist) {
        throw new BadRequestException('User already exists');
      }

      const user = await this.userRepository.create({
        email,
        name,
        stripeId,
        password: 'password',
        confirmed: true,
      });
      const token = await this.generateToken({ id: user.id });
      await this.resetPasswordRepository.create({ userId: user.id, token });

      await this.emailService.sendEmail(
        user.email,
        getRegistrationWithoutPasswordTemplate({
          name: user.name,
          link: `${process.env.FRONTEND_URL}/set-password?${token}`,
        }),
      );
      await this.createSettings(user.id);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async confirmEmail(data: TUser): Promise<{ message: string }> {
    try {
      await this.userRepository.patch(data.id, { confirmed: true });

      await this.emailService.sendEmail(
        data.email,
        getRegistrationTemplate({ name: data.name }),
      );

      return { message: 'Email confirmed successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async refreshToken(
    data: TUser,
  ): Promise<{ user: User; token: string; refreshToken: string }> {
    try {
      const user = await this.userRepository.findOneById(data.id);

      const { password, ...result } = user['dataValues'];
      if (!user) {
        throw new BadRequestException('No such user');
      }
      const token = await this.generateToken(result);
      const refreshToken = await this.generateRefresToken({ id: result.id });
      return { user, token, refreshToken };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async resetPasswordRequest(data: Pick<TUser, 'email'>): Promise<void> {
    try {
      const user = await this.userRepository.findOneByEmail(data.email);
      if (!user) {
        throw new BadRequestException('No such user');
      }
      const result = user['dataValues'];
      const token = await this.generateToken({ id: result.id });
      await this.resetPasswordRepository.create({ userId: result.id, token });
      await this.emailService.sendEmail(
        user.email,
        getForgotPasswordTemplate({
          name: user.name,
          link: `${process.env.FRONTEND_URL}/reset-password?${token}`,
        }),
      );
      return;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async resetPassword(
    data: Pick<TUser, 'password'>,
    token: string,
    user: TUser,
  ): Promise<{ message: string }> {
    try {
      const resetPassword = await this.resetPasswordRepository.findOneByToken(
        token,
      );
      if (!resetPassword || resetPassword.used) {
        throw new BadRequestException('Something went wrong');
      }
      const password: string = await this.hashPassword(data.password);
      await this.userRepository.patch(user.id, { password });
      await this.resetPasswordRepository.patch(resetPassword.id, {
        used: true,
      });
      return { message: 'Password changed successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async generateToken(data): Promise<string> {
    try {
      const token = await this.jwtService.signAsync(data, {
        expiresIn: process.env.TOKEN_EXPIRATION,
        secret: process.env.JWTKEY,
      });
      return token;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async generateRefresToken(data): Promise<string> {
    try {
      const token = await this.jwtService.signAsync(data, {
        expiresIn: process.env.REFRESHTOKEN_EXPIRATION,
        secret: process.env.JWTREFRESHKEY,
      });
      return token;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    try {
      const hash = await bcrypt.hash(password, 10);
      return hash;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async comparePassword(
    enteredPassword: string,
    dbPassword: string,
  ): Promise<boolean> {
    try {
      const match = await bcrypt.compare(enteredPassword, dbPassword);
      return match;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async createSettings(userId: number): Promise<void> {
    try {
      await this.settingsRepository.create(userId);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
