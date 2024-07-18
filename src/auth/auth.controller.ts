import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  @Get('alu')
  messi() {
    return { message: 'hi alu' };
  }
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
}
