import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, // Prisma
    private readonly jwtService: JwtService, // JWT
  ) {}

  signJWT(payload: JwtPayload) {
    // return this.jwtService.sign(payload);
    return this.jwtService.signAsync(payload);
  }

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
          error: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST, // 400
        });
      }

      // Create user
      const newUser = await this.prisma.user.create({
        data: {
          name: name,
          email: email,
          password: bcrypt.hashSync(password, 10), // Hash password
        },
      });
      const { password: _, ...rest } = newUser;

      return {
        user: rest,
        token: await this.signJWT(rest),
      };
    } catch (error) {
      throw new RpcException({
        message: error?.message,
        error: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST, // 400
      });
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    try {
      // Get user and validete it
      const user = await this.prisma.user.findFirst({ where: { email } });
      if (!user) {
        throw new RpcException({
          message: 'Invalid credencials',
          error: 'Unauthorized',
          statusCode: HttpStatus.UNAUTHORIZED, // 401
        });
      }

      // Compare password
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        throw new RpcException({
          message: 'Invalid credencials',
          error: 'Unauthorized',
          statusCode: HttpStatus.UNAUTHORIZED, // 401
        });
      }
      const { password: _, ...rest } = user;

      return {
        user: rest,
        token: await this.signJWT(rest),
      };
    } catch (error) {
      throw new RpcException({
        message: error?.message,
        error: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST, // 400
      });
    }
  }
}
