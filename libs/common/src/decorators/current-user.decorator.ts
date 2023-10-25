/* eslint-disable prettier/prettier */
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDocument } from '../models';

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
  const { user } = context.switchToHttp().getRequest();
  return user?.user || user;
}
export const currentUser = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  const userContext = getCurrentUserByContext(context);
  console.log('current user context',userContext);
  return userContext;
})