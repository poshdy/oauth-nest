import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import config from 'config';
import { GoogleStrategy } from './strategies/google';
import { DatabaseModule } from 'src/database/database.module';
import { User } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { SerializeSession } from './Serialize';

@Module({
  imports: [
    // loading env variables
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    // enable passport to user session
    PassportModule.register({ session: true }),
    // register user entity to auth module
    TypeOrmModule.forFeature([User]),
    // connecting to postgres database
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [SerializeSession, GoogleStrategy, AuthService],
})
export class AuthModule {}
