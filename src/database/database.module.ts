import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        password: config.get('POSTGRES_PASSWORD'),
        username: config.get('POSTGRES_USER'),
        port: 5433,
        host: '127.0.0.1',
        entities: [User],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
