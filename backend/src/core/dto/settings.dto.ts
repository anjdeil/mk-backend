import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional } from 'class-validator';

export class NotificationsSettingsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject({ each: true })
  comments: {
    email: boolean;
    push: boolean;
  };

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  mentions: {
    email: boolean;
    push: boolean;
  };

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  favorites: {
    email: boolean;
    push: boolean;
  };

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  subscriptions: {
    email: boolean;
    push: boolean;
  };

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  sales: {
    email: boolean;
    push: boolean;
  };

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  withdrawal: {
    email: boolean;
    push: boolean;
  };

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  promotions: {
    email: boolean;
    push: boolean;
  };

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  system: {
    email: boolean;
    push: boolean;
  };
}
