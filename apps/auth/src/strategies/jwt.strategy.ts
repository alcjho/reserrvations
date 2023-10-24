/* eslint-disable prettier/prettier */
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    configService: ConfigService,
    private readonly userService: UsersService
  ){
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => request?.cookies?.Authentication || request?.Authentication,
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    })
  }

  async validate({ userId }: TokenPayload) {
    return await this.userService.getUser({_id: userId});
  }
}