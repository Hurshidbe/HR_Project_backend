import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { mongo, Types } from 'mongoose';
import { ref } from 'process';

@Schema({ timestamps: true })
export class Position {
  @Prop()
  title: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  })
  departmentId: Types.ObjectId;
}

export const PositionSchema = SchemaFactory.createForClass(Position);
// import { Department } from "src/modules/department/entities/department.entity"

// export class Position {}

// name
// @Prop({type, ref: 'Department'})
// department: Department
