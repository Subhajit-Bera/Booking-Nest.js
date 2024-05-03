import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomException } from 'src/common/custom.exception';

@Module({
  imports:[PrismaModule],
  controllers: [BookingController],
  providers: [BookingService,PrismaService,CustomException],
})
export class BookingModule {}
