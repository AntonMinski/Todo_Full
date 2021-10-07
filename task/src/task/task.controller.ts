import {Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, UseGuards} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskCreateDto } from './model/create-task.entity';
import { GetUser } from 'src/auth/guards/get-user.decorator';
import { User } from 'src/user/model/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TaskUpdateDto } from './model/update-task.entity';


@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TodoController {
    constructor(private service: TaskService) {
    }

    // This rote just for admin or testing only
    @Get()
    @HttpCode(200)
    async findAll() {
        return this.service.findAll();
    }

    @Get('/byUser')
    @HttpCode(200)
    async allByUser(
        @GetUser() user: User,
        @Query('title') title: String
    ) {
        return this.service.findByUser(user, title);
    }

    @Post()
    @HttpCode(201)
    async create(
        @Body() body: TaskCreateDto,
        @GetUser() user: User
        ) {
        return this.service.create(body, user);
    }


    @Get(':id')
    async get(
        @Param('id') id: number,
        @GetUser() user: User) {
        return this.service.findById(id, user);
    }

    @Put(':id')
    @HttpCode(200)
    async update(
        @Param('id') id: number,
        @Body() body: TaskUpdateDto,
        @GetUser() user: User
    ) 
    {
        return this.service.update(id, body, user);
    }

    @Patch(':id')
    @HttpCode(200)
    async changeStatus(
        @Param('id') id: number,
        @Body() data: TaskUpdateDto,
        @GetUser() user: User
    ) 
    {
        const updatedTask = await this.service.changeStatus(id, data, user);

        return { message: 'Status updated', task: updatedTask }


    }

    @Delete(':id')
    @HttpCode(200)
    async delete(
        @Param('id') id: number,
        @GetUser() user: User
        ) {
        const deleted_task = await this.service.delete(id, user);

        return { message: 'Task deleted', task: deleted_task}
    }
}