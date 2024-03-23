import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';

import { AuthGuard } from 'src/auth/auth.guard';
import { AddTaskDto } from './dto/add-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async addTask(@Request() req, @Body() dto: AddTaskDto) {
    const userId = req.user.sub;
    return this.taskService.addTask(dto, userId);
  }

  @Get()
  async getTask(@Query() query) {
    return this.taskService.getTask(query);
  }

  @Put()
  async updateTask(@Request() req, @Query() query, @Body() dto: UpdateTaskDto) {
    const userId = req.user.sub;
    const { id } = query;
    console.log(req.user);
    return this.taskService.updateTask(id, userId, dto);
  }

  @Delete()
  async deleteTask(@Request() req, @Query() query) {
    const userId = req.user.sub;
    const { id } = query;
    return this.taskService.deleteTask(id, userId);
  }
}
