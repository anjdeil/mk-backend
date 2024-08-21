import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';

export class CreatePlaylistDto {
  @IsNumber()
  ownerId?: number;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  coverImage?: string;

  @IsBoolean()
  @IsOptional()
  public?: boolean;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  tracksIds?: number[];
}

export class UpdatePlaylistDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  isPublic?: boolean;
}
