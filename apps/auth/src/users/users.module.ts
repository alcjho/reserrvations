import { UserDocument, userSchema } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '@app/common';

@Module({
  imports: [DatabaseModule, MongooseModule.forFeature([{ name: UserDocument.name, schema: userSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
