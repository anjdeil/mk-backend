import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

import { TransactionType, TransactionStatus } from '../enums/transactions';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  senderId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  recipientId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty()
  @IsNumber()
  fileId?: number;

  @ApiProperty()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus;
}
