import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop()
  timestamp: Date;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  userId: string;

  @Prop()
  spaceId: string;

  @Prop()
  invoiceId: string;
}

export const reservationSchema = SchemaFactory.createForClass(Reservation);
