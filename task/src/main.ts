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
      
      // защита от лишних данных:
      whitelist: true,
      // выбивать оишбку на них:
      forbidNonWhitelisted: true,
      // преобразовние requset.body в приемлимый вид:
      transform: true,
      // не указывать жестко Types в декораторах:
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