import {
  Body,
  Controller,
  Get,
  Logger,
  LoggerService,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import {
  LoginUserDto,
  ResetPasswordDto,
  ResetPasswordRequestDto,
  SignupUserDto,
} from '../../core/dto';
import {
  DoesUserExistGuard,
  JwtQueryGuard,
  JwtRefreshGuard,
} from '../../core/guards';
import { tokenSchema } from '../../core/swagger.objects';
import { AuthRequest } from '../../core/types/common';
import { EmailService } from '../../shared/services';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger: LoggerService = new Logger(AuthController.name);

  constructor(
    private authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

  // @Post('TEST-send-email')
  // @ApiOperation({ summary: 'test email sender' })
  // async sendEmail(@Body() data: { email: string }) {
  //   return await this.emailService.sendEmail(data.email, 'ITS EMAIL TEMPLATE');
  // }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in',
    schema: tokenSchema,
  })
  async login(@Body() data: LoginUserDto) {
    return await this.authService.login(data);
  }

  @UseGuards(DoesUserExistGuard)
  @Post('signup')
  @ApiOperation({ summary: 'Sign up user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created',
    type: 'application/json',
  })
  async signUp(@Body() data: SignupUserDto) {
    return await this.authService.create(data);
  }

  @UseGuards(JwtQueryGuard)
  @Post('confirm')
  @ApiOperation({ summary: 'Confirm user email' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully confirmed',
    type: 'application/json',
  })
  @ApiQuery({
    name: 'token',
    type: 'string',
  })
  async confirmEmail(@Req() req: AuthRequest) {
    return await this.authService.confirmEmail(req.user);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiResponse({
    status: 200,
    description: 'Return refreshed tokens',
    schema: tokenSchema,
  })
  @ApiBearerAuth()
  async refreshTokens(@Req() req: AuthRequest) {
    return await this.authService.refreshToken(req.user);
  }

  @Post('reset-password-request')
  @ApiOperation({ summary: 'Request password reset' })
  @ApiResponse({
    status: 200,
    description: 'The password reset request has been successfully sent',
    type: 'application/json',
  })
  async resetPasswordRequest(@Body() data: ResetPasswordRequestDto) {
    return await this.authService.resetPasswordRequest(data);
  }

  @UseGuards(JwtQueryGuard)
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({
    status: 200,
    description: 'The password has been successfully reset',
    type: 'application/json',
  })
  @ApiQuery({
    type: 'string',
    name: 'token',
  })
  async resetPassword(
    @Body() data: ResetPasswordDto,
    @Query('token') token: string,
    @Req() req: AuthRequest,
  ) {
    return await this.authService.resetPassword(data, token, req.user);
  }
}
