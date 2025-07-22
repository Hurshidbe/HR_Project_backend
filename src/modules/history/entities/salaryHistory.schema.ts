import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { mongo } from 'mongoose';
import { Department } from 'src/modules/department/entities/department.entity';
import { Employee } from 'src/modules/employee/entities/employee.schema';
import { Position } from 'src/modules/position/entities/position.entity';

////////////////////////////////////////////////////////////////////////////////
@Schema()
export class SalaryHistory {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  })
  employee: Employee;

  @Prop()
  oldSalary: number;

  @Prop()
  newSalary: number;
}
////////////////////////////////////////////////////////////////////////////////

export const SalaryHistorySchema = SchemaFactory.createForClass(SalaryHistory);
