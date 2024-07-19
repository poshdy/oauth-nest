import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import * as session from 'express-session';
import * as passport from 'passport';
async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.setGlobalPrefix('api');
  app.use(
    session({
      secret: 'session-secret',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 600000, // 10 minutes
      },
    }),
  );
  // configure passport to use sessions
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(5000);
}
bootstrap();
