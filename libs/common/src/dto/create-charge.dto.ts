/* eslint-disable prettier/prettier */
import { IsDefined, IsEmail, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { CardDto } from './cart.dto';
import { Type } from 'class-transformer';

export class CreateChargeDto {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CardDto)
  card: CardDto;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEmail()
  @IsOptional()
  email: string;
}