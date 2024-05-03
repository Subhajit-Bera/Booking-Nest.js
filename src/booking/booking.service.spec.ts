import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { PrismaService } from '../prisma/prisma.service';

describe('BookingService', () => {
  let service: BookingService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingService,PrismaService],
    }).compile();

    service = module.get<BookingService>(BookingService);
    prismaService = module.get<PrismaService>(PrismaService);
    await prismaService.$connect();
  });

  afterAll(async () => {
    jest.clearAllMocks();
    await prismaService.clearDatabase(); // Clear database data after all test cases have run
    await prismaService.$disconnect();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('create', () => {
    it('should create a booking', async () => {
      const createBookingDto = { name: 'Test Booking' };
      const expectedBooking = { id: 1, name: 'Test Booking' };
      
      jest.spyOn(prismaService.booking, 'create').mockResolvedValue(expectedBooking);
      
      const result = await service.create(createBookingDto);
      
      expect(result).toEqual(expectedBooking);
    });

    it('should throw an error if booking name is missing', async () => {
      const createBookingDto = { name: '' };

      await expect(service.create(createBookingDto)).rejects.toThrowError(new CustomException('Booking name is required', HttpStatus.BAD_REQUEST));
    });
  });
});
