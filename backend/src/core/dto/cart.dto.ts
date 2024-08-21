import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class CartDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  fileId: number;
}

export class UnauthorizedFlowDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  fileIds: number[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  paymentMethodId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  user: {
    email: string;
    name: string;
  };
}
