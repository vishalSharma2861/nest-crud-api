import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schema/task.schema';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TaskController],
  providers: [TaskService, JwtService],
})
export class TaskModule {}
