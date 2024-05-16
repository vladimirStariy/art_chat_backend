import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post('login')
  async login(
    @Body() body,
    @Res() response: Response
  ): Promise<Response> {
    try {
      return response.status(HttpStatus.OK).json('data');
    } catch(e) {
      if (e instanceof Error) {
        console.log(e.message);
        throw new Error(e.message);
      }
    }
  }

  @Post('register')
  async register(
    @Body() body,
    @Res() response: Response
  ): Promise<Response> {
    try {
      return response.status(HttpStatus.OK).json('data');
    } catch(e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  }
}
