
import { Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./model/user.entity";
import {getManager, Repository} from "typeorm";
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

    // async updateRefreshToken(email:string, )

    async updateRefreshToken(email, refreshToken){

        const entityManager = getManager(); 
        
        const user = await entityManager.findOne(User, {where: {email: email} });

        if (!user) {
            throw new NotFoundException(`User with email '${email}' not found`);
        }

        user.refreshToken = refreshToken

        await entityManager.save(user);

        return user;

    }

}