import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { ref } from 'process';
import {
  DrivingGrade,
  EmployeeStatusEnum,
  Region,
  Sex,
  Statuses,
} from 'src/enums/enums';
import {
  Course,
  Education,
  Experience,
  JobRequirements,
  LangGradeSchema,
  PersonalInfo,
} from 'src/modules/candidates/entities/candidate.schema';
import { Department } from 'src/modules/department/entities/department.entity';
import { Position } from 'src/modules/position/entities/position.entity';

@Schema({ timestamps: true })
export class Employee {
  @Prop({ type: PersonalInfo })
  personalInfo: PersonalInfo[];

  @Prop({ type: JobRequirements })
  jobRequirements: JobRequirements[];

  @Prop({ default: [] })
  experience: Experience[];

  @Prop({ default: [] })
  education: Education[];

  @Prop({ default: [] })
  course: Course[];

  @Prop({ type: [LangGradeSchema], default: [] })
  langGrades: LangGradeSchema[];

  @Prop()
  hardSkills: string[];

  @Prop({ type: [String], default: [] })
  softSkills: string[];

  @Prop({ type: String, default: DrivingGrade.No })
  drivingLicence: DrivingGrade;

  @Prop({ default: false })
  criminalRecord: boolean;

  @Prop()
  extraInfo: string;

  // @Prop({ type: [String], default: [], required: false })
  // certificates: string[];
  ///////////////////////////////////////////////////////////////
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  })
  department: Department;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Position',
    required: true,
  })
  position: Position;

  @Prop({ required: false, default: 0 })
  salary: number;

  @Prop({ required: true })
  EmployeeStatus: EmployeeStatusEnum;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
