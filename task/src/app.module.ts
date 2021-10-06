import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import {APP_GUARD} from "@nestjs/core";
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { HttpLoggerMiddleware } from '@nest-toolbox/http-logger-middleware';

import { ConfigModule } from '@nestjs/config';
import { typeOrmConfigAsync } from './config/typeorm.config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    TodoModule,
    UserModule,
    AuthModule,
    CommonModule],
  controllers: [AppController],
  providers: [
    AppService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes({
        path: '*',
        method: RequestMethod.ALL,
    });
}
  
}
