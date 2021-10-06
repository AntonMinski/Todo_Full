import { Param, Body, ClassSerializerInterceptor, Controller, Get, Post,
    Put, Delete, UseGuards, UseInterceptors, Query, Req, 
    BadRequestException } from '@nestjs/common';
 import {UserService} from './user.service';
 import * as bcrypt from 'bcryptjs';
 import {UserCreateDto} from "./model/dto/create-user.dto";
 import {UserUpdateDto} from "./model/dto/user-update.dto";
 import {AuthGuard} from '../auth/guards/auth.guard';
 import {User} from "./model/user.entity";
 import {AuthService} from "../auth/auth.service";
 import {Request} from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/guards/get-user.decorator';
 JwtAuthGuard
 
 
 
 @UseInterceptors(ClassSerializerInterceptor)
 @UseGuards(JwtAuthGuard)
 @Controller('users')
 export class UserController { 
 
   constructor(
     private service: UserService,
     private authService: AuthService
 ) {
 }
   // admin/development only
   @Get()
   async all(@Query('page') page = 1) {
     return this.service.findAll();
 }

    // admin/development only
   @Post()
   async create(@Body() body: UserCreateDto): Promise<User> {
         const password = await bcrypt.hash('1234', 12);
 
         const {role_id, ...data} = body;
 
         return this.service.create({
             ...data,
             password,
         });
 
     }
 
    //  @Get(':id')
    //  async get(@Param('id') id: number) {
    //      return this.service.findOne({id});
    //  }
 
     @Put('info')
     async updateInfo(
         @GetUser() user: User,
         @Body() body: UserUpdateDto
     ) {
 
         await this.service.update(user.id, body);

         return { message: 'User Info updated', body}
 
     }
     
     @Put('password')
     async updatePassword(
         @GetUser() user: User,
         @Body('password') password: string,
         @Body('password_confirm') password_confirm: string,
     ) {
         if (password !== password_confirm) {
             throw new BadRequestException('Passwords do not match!');
         }
 
         const hashed = await bcrypt.hash(password, 12);
 
         this.service.update(user.id, {
             password: hashed
         });
 
        //  const result = await this.service.findOne({id: user.id});
         return { message: 'Password updated'}
     }
 
    
     @Delete()
     async delete(
         @GetUser() user: User
         )  {
         const result = await this.service.delete(user.id);

         return { message: 'user deleted'};
     }
 
 
 }