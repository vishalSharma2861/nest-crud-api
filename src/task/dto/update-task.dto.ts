import { IsNotEmpty, IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';
import { PRIORITY, STATUS } from '../task.enum';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  action: string;

  @IsOptional()
  @IsString()
  taskName: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(PRIORITY)
  priority: PRIORITY;

  @IsOptional()
  @IsEnum(STATUS)
  status: STATUS;

  @IsOptional()
  dueDateTime: any;
}
