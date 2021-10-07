import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/http-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      
      // защита от лишних данных, не указанных в DTO при создании/редактировании:
      whitelist: true,
      // выбивать оишбку на них (иначе тихая чистка):
      forbidNonWhitelisted: true,
      // преобразовние запроса для соответсвтия полям: ?
      transform: true,
      // преобразование автоматически:
      transformOptions: {
        enableImplicitConversion: true,
      }
    }),
  );
  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cors())
  await app.listen(3000);
}
bootstrap();