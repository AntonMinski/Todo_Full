import { IsOptional } from 'class-validator';

export class GetTasksFilterDto {

  @IsOptional()
  completed?: string;

  @IsOptional()
  title?: string;
}