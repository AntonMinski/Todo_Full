
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {Request} from 'express';
import {JwtService} from "@nestjs/jwt";
import { User } from 'src/user/model/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private readonly usersService: UserService
        ) {
    }

    async userId(request: Request): Promise<number> {
        const cookie = request.cookies['jwt'];

        const data = await this.jwtService.verifyAsync(cookie);

        return data['id'];
    }

    async validateUser(payload): Promise<User> {
        const user = await this.usersService.findOne(payload.id);
        if (!user) {
          throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
      }
}