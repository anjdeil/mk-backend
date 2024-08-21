import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMusicDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  requirements: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  bpm: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  mp3Price: number;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  wavPrices: number[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  stemsPrices: number[];

  @ApiProperty()
  @IsArray()
  categories: number[];

  @ApiProperty()
  @IsArray()
  types: number[];

  @ApiProperty()
  @IsArray()
  instruments: number[];

  @ApiProperty()
  @IsArray()
  keys: number[];

  @ApiProperty()
  @IsArray()
  moods: number[];
}

export class UpdateMusicDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  requirements: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  bpm: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  duration: number;

  @ApiProperty()
  @IsOptional()
  categories: number[];

  @ApiProperty()
  @IsOptional()
  types: number[];

  @ApiProperty()
  @IsOptional()
  instruments: number[];

  @ApiProperty()
  @IsOptional()
  keys: number[];

  @ApiProperty()
  @IsOptional()
  moods: number[];
}
