import {Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, UseGuards} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskCreateDto } from './model/dto/create-task.entity';
import { GetUser } from 'src/auth/guards/get-user.decorator';
import { User } from 'src/user/model/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TaskUpdateDto } from './model/dto/update-task.entity';
import { GetTasksFilterDto } from './model/dto/filter-task.entity';
import { PaginationDto } from './model/dto/pagination.dto';


@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TodoController {
    constructor(private service: TaskService) {}

    @Get()
    @HttpCode(200)
    async findAll(
        @GetUser() user: User,
        @Query() searchQuery: GetTasksFilterDto,
            ) {
        const tasks = await this.service.findByUser(user, searchQuery);

        return { message: 'Success', data: tasks[0], total: tasks[1] }
    }

    @Post()
    @HttpCode(201)
    async create(
        @Body() body: TaskCreateDto,
        @GetUser() user: User
        ) {
        const task = await this.service.create(body, user);
        return { message: 'task created', data: task }
    }


    @Get(':id')
    async get(
        @Param('id') id: number,
        @GetUser() user: User) {
        const task = await this.service.findById(id, user);
        return { message: 'Success', data: task }
    }

    @Put(':id')
    @HttpCode(200)
    async update(
        @Param('id') id: number,
        @Body() body: TaskUpdateDto,
        @GetUser() user: User
    ) 
    {
        const updatedTask = await this.service.update(id, body, user);
        return { message: 'Task updated', data: updatedTask }
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

        return { message: 'Status updated', data: updatedTask }


    }

    @Delete(':id')
    @HttpCode(200)
    async delete(
        @Param('id') id: number,
        @GetUser() user: User
        ) {
        const deleted_task = await this.service.delete(id, user);

        return { message: 'Task deleted', data: deleted_task}
    }
}