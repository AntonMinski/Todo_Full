import {IsNotEmpty, IsOptional} from "class-validator";

export class TaskUpdateDto {
    @IsOptional()
    task: string;

    @IsOptional()
    isActive: boolean;

}

