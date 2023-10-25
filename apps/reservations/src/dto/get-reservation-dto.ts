/* eslint-disable prettier/prettier */
import { IsDate, IsDefined, IsNotEmpty, IsNotEmptyObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateChargeDto } from '@app/common';

export class GetReservationDto {
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  spaceId: string;

  @IsString()
  @IsNotEmpty()
  invoiceId: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto;
}