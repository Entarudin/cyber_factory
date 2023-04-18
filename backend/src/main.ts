import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useSwagger } from './swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await useSwagger(app);
  await app.listen(5000);
}

bootstrap();
