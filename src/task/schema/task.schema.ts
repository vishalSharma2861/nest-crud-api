import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import {PRIORITY, STATUS} from '../task.enum'

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId: mongoose.Types.ObjectId;

  @Prop({
    required: true,
  })
  action: string;

  @Prop({
    required: true,
  })
  taskName: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
    enum: PRIORITY
  })
  priority: PRIORITY;

  @Prop({
    required: true,
    enum: STATUS
  })
  status: STATUS;

  @Prop()
  dueDateTime: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
