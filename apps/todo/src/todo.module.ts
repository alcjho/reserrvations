/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, todoSchema } from './models/todo.schema';
import { DatabaseModule } from '@app/common';

@Module({
  providers: [TodoService],
  controllers: [TodoController],
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Todo.name, schema: todoSchema }]),
  ],
})
export class TodoModule {}