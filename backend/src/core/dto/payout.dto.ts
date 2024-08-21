import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { PayoutType } from '../enums/payout';

export class CreatePayoutDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PayoutType)
  type: PayoutType;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  swiftCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountNumber: string;
}

export class UpdatePayoutDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(PayoutType)
  type?: PayoutType;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  swiftCode?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  accountNumber?: string;
}
