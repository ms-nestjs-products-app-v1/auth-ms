import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { envs } from 'src/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  imports: [
    // JWT Module
    JwtModule.register({
      global: true,
      secret: envs.jwtSecret, // JWT secret
      signOptions: { expiresIn: '2h' },
    }),
  ],
})
export class AuthModule {}
