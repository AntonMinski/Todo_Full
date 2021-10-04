import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { TodoController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './model/entity';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';



@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    UserModule,
],
  controllers: [TodoController],
  providers: [TaskService]
})

export class TodoModule {}
