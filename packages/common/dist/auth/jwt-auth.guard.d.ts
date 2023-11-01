import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { ClientProxy } from "@nestjs/microservices";
export declare class JwtAuthGard implements CanActivate {
    private readonly authClient;
    constructor(authClient: ClientProxy);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
