import { Injectable, Logger } from '@nestjs/common';

import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  private loggger = new Logger('PrismaService');

  constructor() {
    super();
    this.loggger.log('MongoDB connected');
  }
}
