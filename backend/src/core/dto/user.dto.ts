import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsString,
  MaxLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class SignupUserDto {
  @ApiProperty({ default: 'test-email' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ default: 'test@email.com' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ default: '1q2w3e4r5t^Y' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  readonly password: string;
}

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class ResetPasswordRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(20)
  @IsString()
  @MinLength(6)
  readonly password: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly pseudonym?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly biography?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly phone?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly password?: string;
}

export class UpdateAvatarDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly avatar: Express.Multer.File;
}
