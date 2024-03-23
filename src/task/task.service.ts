import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddTaskDto } from './dto/add-task.dto';
import { Task, TaskDocument } from './schema/task.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async addTask(dto: AddTaskDto, userId) {
    try {
      const { action, taskName, description, priority, status, dueDateTime } =
        dto;
      const model = new this.taskModel();
      model.userId = userId;
      model.action = action;
      model.taskName = taskName;
      model.description = description;
      model.priority = priority;
      model.status = status;
      model.dueDateTime = dueDateTime;
      await model.save();
      return { message: 'Task has been added succesfully' };
    } catch (error) {
      throw error;
    }
  }

  async getTask(query) {
    try {
      const { userName,action,priority, status, page } = query;
      const resPerPage = 10;
      const currentPage = Number(page) || 1;
      const skip = (currentPage - 1) * resPerPage;

      const countFilter = {};

      const ags: any[] = [
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user_detail',
          },
        },
        {
          $unwind: {
            path: '$user_detail',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            userId: 1,
            action: 1,
            taskName: 1,
            description: 1,
            priority: 1,
            status: 1,
            dueDateTime: 1,
            'user_detail.username': 1,
          },
        },
      ];

      if (userName && action && priority && status) {
        const data = { $regex: userName, $options: 'i' };
        countFilter['$or'] = [
          {
            'user_detail.username': data,
          },  
        ],
        countFilter['action'] = action;
        countFilter['priority'] = priority;
        countFilter['status'] = status;
      }else if (action && priority && status) {
        countFilter['action'] = action;
        countFilter['priority'] = priority;
        countFilter['status'] = status;
      }else if(priority && status) {
        countFilter['priority'] = priority;
        countFilter['status'] = status;
      }else if(userName && status) {
        const data = { $regex: userName, $options: 'i' };
        countFilter['$or'] = [
          {
            'user_detail.username': data,
          },  
        ];
        countFilter['status'] = status;
      } else if(userName && priority) {
        const data = { $regex: userName, $options: 'i' };
        countFilter['$or'] = [
          {
            'user_detail.username': data,
          },  
        ];
        countFilter['priority'] = priority;
      }
      else if (userName) {
        const data = { $regex: userName, $options: 'i' };
        countFilter['$or'] = [
          {
            'user_detail.username': data,
          },  
        ];
      }else if (action) {
        countFilter['action'] = action;
      }else if (priority) {
        countFilter['priority'] = priority;
      }else if (status) {
        countFilter['status'] = status;
      }
      
      ags.push({ $match: countFilter });

      const task = await this.taskModel
        .aggregate(ags)
        .sort({ _id: -1 })
        .skip(skip)
        .limit(resPerPage);

      return { message: 'Task list', task };
    } catch (error) {
      throw error;
    }
  }

  async updateTask(id, userId, dto) {
    try {
      const task = await this.taskModel.findOne({ _id: id, userId: userId });
      if (!task) {
        throw new NotFoundException('Task Id Not Found');
      }
      const { action, taskName, description, priority, status, dueDateTime } =
        dto;
      if (action) task.action = action;
      if (taskName) task.taskName = taskName;
      if (description) task.description = description;
      if (priority) task.priority = priority;
      if (status) task.status = status;
      if (dueDateTime) task.dueDateTime = dueDateTime;
      const data = await task.save();
      return { message: 'Task updated sucessfully', data };
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(id,userId){
    try{
      const task = await this.taskModel.findOneAndDelete({ _id: id, userId: userId });
      if (!task) {
        throw new NotFoundException('Task Id Not Found');
      }
      return {message:"Task deleted sucessfully"}
    }catch(error){
      throw error
    }
  }
}
