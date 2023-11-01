"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGard = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const services_1 = require("./constants/services");
const microservices_1 = require("@nestjs/microservices");
let JwtAuthGard = class JwtAuthGard {
    constructor(authClient) {
        this.authClient = authClient;
    }
    canActivate(context) {
        const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
        if (!jwt) {
            return false;
        }
        return this.authClient.send('authentication', {
            Authentication: jwt,
        }).pipe((0, rxjs_1.tap)((res) => {
            console.log('guard res', res);
            context.switchToHttp().getRequest().user = res;
        }), (0, rxjs_1.map)(() => true));
    }
};
exports.JwtAuthGard = JwtAuthGard;
exports.JwtAuthGard = JwtAuthGard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(services_1.AUTH_SERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], JwtAuthGard);
//# sourceMappingURL=jwt-auth.guard.js.map