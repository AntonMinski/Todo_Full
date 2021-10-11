import { IsEnum, isEnum, IsOptional } from 'class-validator';
// import { TaskStatusDto } from './change-status.entity';
import { TaskStatusEnum } from './filter-status-enum';

export class GetTasksFilterDto {

  @IsOptional()
  title?: string;

  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status?: string;
}