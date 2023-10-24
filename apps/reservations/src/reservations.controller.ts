import { Controller, Post, Get, Put, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtAuthGard, UserDto, currentUser } from '@app/common';
import { GetReservationDto } from './dto/get-reservation-dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}
  @Get()
  async index() {
    return await this.reservationsService.findAll();
  }

  @UseGuards(JwtAuthGard)
  @Post()
  async create(@Body() getReservationDto: GetReservationDto, @currentUser() user: UserDto) {
    return await this.reservationsService.create(getReservationDto, user);
  }

  @UseGuards(JwtAuthGard)
  @Delete(':id')
  async delete(@Param() id: string) {
    return await this.reservationsService.delete(id);
  }

  @UseGuards(JwtAuthGard)
  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.reservationsService.find(id);
  }

  @UseGuards(JwtAuthGard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return await this.reservationsService.update(id, updateReservationDto);
  }
}
