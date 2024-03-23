import { IsNotEmpty, IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';
import { PRIORITY, STATUS } from '../task.enum';

export class AddTaskDto {
  @IsNotEmpty()
  @IsString()
  action: string;

  @IsNotEmpty()
  @IsString()
  taskName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(PRIORITY)
  priority: PRIORITY;

  @IsNotEmpty()
  @IsEnum(STATUS)
  status: STATUS;

  @IsOptional()
  dueDateTime: any;
}
