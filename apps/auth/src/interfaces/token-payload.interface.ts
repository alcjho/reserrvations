/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class TokenPayload {
  @IsString()
  userId: string;
}