import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }
  async onModuleInit() {
    await this.$connect();
  }

  async clearDatabase() {
    try {
      await this.booking.deleteMany({}); // Replace 'yourModel' with your Prisma model
    } catch (error) {
      console.error('Error clearing database:', error);
    }
  }
}