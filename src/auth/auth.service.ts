import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma.service';
import { RegisterUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async registerUser(registerUserDto: RegisterUserDto) {
    const { name, email, password } = registerUserDto;

    try {
      // Get user and validate
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      if (user) {
        throw new RpcException({
          message: 'User already exists',
          status: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST, // 400
        });
      }

      // Create user
      const newUser = await this.prisma.user.create({
        data: {
          name: name,
          email: email,
          password: bcrypt.hashSync(password, 10), // Hash password
          // password: '',
        },
      });
      const { password: _, ...rest } = newUser;

      return {
        user: rest,
        token: 'ABC123',
      };
    } catch (error) {
      throw new RpcException({
        message: error?.message,
        status: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST, // 400
      });
    }

    return registerUserDto;
  }
}
