import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { PrismaService } from '../prisma/prisma.service';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';


describe('BookingController', () => {
  // let controller: BookingController;
  let app: INestApplication
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [BookingService, PrismaService],
    }).compile();

    app = moduleRef.createNestApplication();
    prismaService = moduleRef.get<PrismaService>(PrismaService);
    await prismaService.$connect();
    app.init();
    // controller = module.get<BookingController>(BookingController);
  });

  afterAll(async () => {
    await app.close();
    await prismaService.clearDatabase(); // Clear database data after all test cases have run
    await prismaService.$disconnect();
  })



  it('/POST bookings', async () => {
    const createBookingDto: CreateBookingDto = {
      name: 'Test Booking',

    };
    const res = await request(app.getHttpServer())
      .post('/booking')
      .send(createBookingDto)
      .expect(HttpStatus.CREATED);
  });

  it('/GET bookings', async () => {
    const res = await request(app.getHttpServer())
      .get('/booking')
      .expect(HttpStatus.OK);
    
  });

  it('/Patch bookings/:id', async () => {
    const updateBookingDto: UpdateBookingDto = {
      // Populate with data to update
      name: 'Updated Booking',
    };
    const res = await request(app.getHttpServer())
      .put('/booking/:id') // Replace :id with actual id
      .send(updateBookingDto)
      .expect(HttpStatus.OK);
    // Add assertion for response body if needed
  });

  it('/DELETE bookings/:id', async () => {
    const res = await request(app.getHttpServer())
      .delete('/booking/:id') 
      .expect(HttpStatus.OK);
    
  });

  // Test error handling and exceptions

  //create
  it('handles errors', async () => {
    const res = await request(app.getHttpServer())
      .post('/booking')
      .send({})
      .expect(HttpStatus.BAD_REQUEST);
  });



  //update
  it('handles errors for PATCH /booking/:id', async () => {
    const res = await request(app.getHttpServer())
      .patch('/booking/invalid-id') 
      .expect(HttpStatus.NOT_FOUND);
  });
  
  // Test error handling for DELETE /booking/:id
  it('handles errors for DELETE /booking/:id', async () => {
    const res = await request(app.getHttpServer())
      .delete('/booking/invalid-id') 
      .expect(HttpStatus.NOT_FOUND); 
  });

});
