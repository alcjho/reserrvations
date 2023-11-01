"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const common_1 = require("@nestjs/common");
const getCurrentUserByContext = (context) => {
    const { user } = context.switchToHttp().getRequest();
    return user?.user || user;
};
exports.currentUser = (0, common_1.createParamDecorator)((_data, context) => {
    const userContext = getCurrentUserByContext(context);
    console.log('current user context', userContext);
    return userContext;
});
//# sourceMappingURL=current-user.decorator.js.map