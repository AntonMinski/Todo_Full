import { IsNotEmpty } from "class-validator";

export class LoginUserDto {  
    @IsNotEmpty()  
    readonly refreshToken: string;
}