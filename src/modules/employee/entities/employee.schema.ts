import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { DrivingGrade, EmployeeStatusEnum } from 'src/enums/enums';

import { Department } from 'src/modules/department/entities/department.entity';
import { Position } from 'src/modules/position/entities/position.entity';

import {
  Course,
  CourseSchema,
  Education,
  EducationSchema,
  Experience,
  ExperienceSchema,
  JobRequirementsSchema,
  JobRequirement,
  LangGrade,
  PersonalInfo,
  PersonalInfoSchema,
  LangGradeSchema,
} from 'src/types/object.types';

@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop({ type: [PersonalInfoSchema], required: true })
  personalInfo: PersonalInfo[];

  @Prop({ type: [JobRequirementsSchema], default: [] })
  jobRequirements: JobRequirement[];

  @Prop({ type: [ExperienceSchema], default: [] })
  experience: Experience[];

  @Prop({ type: [EducationSchema], default: [] })
  education: Education[];

  @Prop({ type: [CourseSchema], default: [] })
  course: Course[];

  @Prop({ type: [LangGradeSchema], default: [] })
  langGrades: LangGrade[];

  @Prop({ type: [String], default: [] })
  hardSkills: string[];

  @Prop({ type: [String], default: [] })
  softSkills: string[];

  @Prop({ type: [String], enum: DrivingGrade, default: [] })
  drivingLicence: DrivingGrade[];

  @Prop({ default: false })
  criminalRecord: boolean;

  @Prop({ type: [String] })
  extraInfo: string[];
  @Prop({ type: Number, default: null })
  telegramId: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  })
  department: Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Position',
    required: true,
  })
  position: Types.ObjectId;

  @Prop({ default: 0 })
  salary: number;

  @Prop({ enum: EmployeeStatusEnum, required: true })
  employeeStatus: EmployeeStatusEnum;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
