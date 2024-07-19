import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  signIn() {
    return { message: 'Google auth' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  redirect() {
    return { message: 'done' };
  }
  @Get('user-status')
  status(@Req() request: Request) {
    if (request?.user) {
      return { message: 'authenticated' };
    } else {
      return { message: 'unauthorized' };
    }
  }
}
