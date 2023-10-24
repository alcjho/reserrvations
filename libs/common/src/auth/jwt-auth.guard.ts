/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Observable, map, tap } from "rxjs";
import { AUTH_SERVICE } from "./constants/services";
import { ClientProxy } from "@nestjs/microservices";
import { UserDto } from "../dto";

@Injectable()
export class JwtAuthGard implements CanActivate {
  //injecting auth ClientProxy that allows other microservices to talk to the auth service
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    if (!jwt) {
      return false;
    }
    return this.authClient.send<UserDto>('authentication', {
      Authentication: jwt,
    }).pipe(
      tap((res) => {
        console.log('guard res', res)
        context.switchToHttp().getRequest().user = res;
      }),
      map(() => true)
    )
  }
 }
