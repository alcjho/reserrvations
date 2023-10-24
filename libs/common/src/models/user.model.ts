/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import userAbstraction from './user-abscract';
export type TDocument = UserDocument & Document;

@Schema()
export class UserDocument extends userAbstraction {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  postal_code: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const userSchema = SchemaFactory.createForClass(UserDocument);
