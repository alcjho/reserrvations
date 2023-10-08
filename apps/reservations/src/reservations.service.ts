import { Injectable, Logger } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation, TDocument } from './models/reservation.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReservationsService {
  private readonly logger = new Logger(ReservationsService.name);
  constructor(@InjectModel(Reservation.name) private readonly model: Model<TDocument>) {}

  async create(createTodoDto: CreateReservationDto): Promise<Reservation> {
    return await new this.model({
      ...createTodoDto,
      createdAt: new Date(),
    }).save();
  }

  async find(_id: string): Promise<Reservation> {
    this.logger.log(`Retrieve reservation by id`);
    return await this.model.findById(_id);
  }
}
