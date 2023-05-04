import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { useSwagger } from '@/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001'],
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await useSwagger(app);
  await app.listen(5000);
}

bootstrap();
