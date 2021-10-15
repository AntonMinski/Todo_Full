import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class UserDto {  
    @IsNotEmpty()  
    id: string;

    @IsNotEmpty()  
    username: string;

    @IsNotEmpty()  
    @IsEmail()  
    email: string;

    @IsOptional()
    refreshToken: string
    
}