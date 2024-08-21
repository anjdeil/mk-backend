import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';

import { MusicExtension } from '../enums/files';

export class CreateFileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty()
  @IsEnum(MusicExtension)
  @IsNotEmpty()
  type: MusicExtension;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  musicId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

export class UpdateFileDto {
  @ApiProperty()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsString()
  url?: string;

  @ApiProperty()
  @IsEnum(MusicExtension)
  type?: MusicExtension;

  @ApiProperty()
  @IsNumber()
  cost?: number;

  @ApiProperty()
  @IsNumber()
  musicId?: number;

  @ApiProperty()
  @IsNumber()
  userId?: number;
}
