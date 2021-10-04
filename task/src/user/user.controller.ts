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
 
   @Get()
   async all(@Query('page') page = 1) {
     return this.service.findAll();
 }
 
   @Post()
   async create(@Body() body: UserCreateDto): Promise<User> {
         const password = await bcrypt.hash('1234', 12);
 
         const {role_id, ...data} = body;
 
         return this.service.create({
             ...data,
             password,
         });
 
     }
 
     @Get(':id')
     async get(@Param('id') id: number) {
         return this.service.findOne({id}, ['role']);
     }
 
     @Put('info')
     async updateInfo(
         @Req() request: Request,
         @Body() body: UserUpdateDto
     ) {
         const id = await this.authService.userId(request);
 
         await this.service.update(id, body);
 
         return this.service.findOne({id});
     }
 
     @Put('password')
     async updatePassword(
         @Req() request: Request,
         @Body('password') password: string,
         @Body('password_confirm') password_confirm: string,
     ) {
         if (password !== password_confirm) {
             throw new BadRequestException('Passwords do not match!');
         }
 
         const id = await this.authService.userId(request);
 
         const hashed = await bcrypt.hash(password, 12);
 
         await this.service.update(id, {
             password: hashed
         });
 
         return this.service.findOne({id});
     }
 
     @Put(':id')
     async update(
         @Param('id') id: number,
         @Body() body: UserUpdateDto
     ) {
         const {role_id, ...data} = body;
 
         await this.service.update(id, {
             ...data,
             role: {id: role_id}
         });
 
         this.service.update(id, body);
       
  
         return this.service.findOne({id});
     };
 
     @Delete(':id')
     async delete(@Param('id') id: number) {
         return this.service.delete(id);
     }
 
 
 }