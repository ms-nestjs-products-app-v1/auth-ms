import { HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { RegisterUserDto } from './dto';
import { RpcException } from '@nestjs/microservices';

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
          password: password, // TODO: hash/encriptar
        },
      });

      return {
        user: newUser,
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
