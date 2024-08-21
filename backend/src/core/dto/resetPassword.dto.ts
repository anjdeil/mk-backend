import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateResetPasswordDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;
}

export class UpdateResetPasswordDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  used: boolean;
}
