import {IsNotEmpty, IsOptional} from "class-validator";

export class TaskStatusDto {

    @IsNotEmpty()
    isActive: boolean;

}

