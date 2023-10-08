import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    console.log(createReservationDto);
    return this.reservationsService.create(createReservationDto);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.reservationsService.find(id);
  }
}
