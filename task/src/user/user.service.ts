
import { Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./model/user.entity";
import {Repository} from "typeorm";
import {AbstractService} from "../common/abstract.service";

@Injectable()
export class UserService extends AbstractService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
        super(userRepository);
    }

    async findByPayload({ email }: any): Promise<User> {
        // console.log('3', email)
        return await this.findOne({ where: { email } });
      }

}