import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Department } from 'src/modules/department/entities/department.entity';
import { Employee } from 'src/modules/employee/entities/employee.schema';
import { Position } from 'src/modules/position/entities/position.entity';

@Schema({ timestamps: true })
export class PositionHistory {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Employee',
  })
  employee: Employee;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Position',
  })
  oldPosition: Position;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Position',
  })
  newPosition: Position;
}

export const PositionHistorySchema =
  SchemaFactory.createForClass(PositionHistory);
