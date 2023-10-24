/* eslint-disable prettier/prettier */
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation, TDocument } from './models/reservation.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PAYMENTS_SERVICE, UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { GetReservationDto } from './dto/get-reservation-dto';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
  private readonly logger = new Logger(ReservationsService.name);
  constructor(
    @InjectModel(Reservation.name) private readonly model: Model<TDocument>,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
    ) {}

  async create(getReservationDto: GetReservationDto, {email, _id: userId}: UserDto) {
    const createReservationDto = this.convertToCreateDto(getReservationDto, userId);
    return this.paymentsService.send('create-charge', {
      ...getReservationDto.charge,
      email,
    })
    .pipe(
      map(() => {
        return new this.model({
          ...createReservationDto,
          timestamp: new Date(),
        }).save();
      })
    )
  }

  convertToCreateDto(getReservationDto: GetReservationDto, userId: string): CreateReservationDto {
    return {
      ...getReservationDto,
      userId,
    };
  }

  async find(_id: string): Promise<Reservation> {
    this.logger.log(`Retrieve reservation by id`);
    return await this.model.findById(_id);
  }

  async findAll(): Promise<Reservation[]> {
    return await this.model.find().exec();
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    return await this.model.findByIdAndUpdate(_id, updateReservationDto).exec();
  }

  async delete(_id: string): Promise<Reservation> {
    return await this.model.findByIdAndDelete(_id).exec();
  }
}
