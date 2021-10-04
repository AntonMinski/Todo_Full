import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/user/model/user.entity";


//to use request.user:
export const GetUser = createParamDecorator((_data, ctx: ExecutionContext): User => 
{ const request = ctx.switchToHttp().getRequest();
    return request.user
 });