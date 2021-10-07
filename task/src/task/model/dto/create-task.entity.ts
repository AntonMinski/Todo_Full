import {IsNotEmpty} from "class-validator";

export class TaskCreateDto {
    @IsNotEmpty()
    task: string;
}

