import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.status.enum ';

export class GetTaskFilterDto {
  // otional question marks do not work at runtime
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
