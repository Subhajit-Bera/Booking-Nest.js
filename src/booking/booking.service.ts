import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CustomException } from '../common/custom.exception'; 
import { HttpStatus } from '@nestjs/common';



@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}
  
  // async create(createBookingDto: CreateBookingDto) {
  //   return await this.prisma.booking.create({
  //     data: createBookingDto,
  //   });
  // }


  async create(createBookingDto: CreateBookingDto){
    if (!createBookingDto.name) {
      throw new CustomException('Booking name is required', HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.prisma.booking.create({
        data: createBookingDto,
      });
    } catch (error) {
      throw new CustomException('Failed to create booking');
      // console.log(error);
    }
  }



  async findAll() {
    try {
      return await this.prisma.booking.findMany();
    } catch (error) {
      throw new CustomException('Failed to retrieve bookings', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async findOne(id: string) {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: { id },
      });
      if (!booking) {
        throw new CustomException(`Booking with id ${id} not found`, HttpStatus.NOT_FOUND);
      }
      return booking;
    } catch (error) {
      throw new CustomException('Failed to retrieve booking', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: { id },
      });
      if (!booking) {
        throw new CustomException(`Booking with id ${id} not found`, HttpStatus.NOT_FOUND);
      }
      const updatedBooking = await this.prisma.booking.update({
        where: { id },
        data: updateBookingDto,
      });
      return updatedBooking;
    } catch (error) {
      throw new CustomException('Failed to update booking', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: { id },
      });
      if (!booking) {
        throw new CustomException(`Booking with id ${id} not found`, HttpStatus.NOT_FOUND);
      }
      await this.prisma.booking.delete({
        where: { id },
      });
      
      return new CustomException(`Booking deleted Successfully,`,HttpStatus.OK);
    } catch (error) {
      throw new CustomException('Failed to remove booking', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

  

