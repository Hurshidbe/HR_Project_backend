import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { DrivingGrade, EmployeeStatusEnum, Region, Sex } from 'src/enums/enums';

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
  LangGradeSchema,
} from 'src/types/object.types';

@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop()
  fullName: string;

  @Prop()
  sex: Sex;

  @Prop({ type: Date })
  birthDate: Date;

  @Prop()
  phoneNumber: string;

  @Prop()
  email: string;

  @Prop({
    set: (value: string) => value?.toLowerCase?.() ?? value,
  })
  tgUsername: string;

  @Prop()
  region: Region;

  @Prop()
  address: string;

  @Prop()
  occupation: string;

  @Prop({ type: { JobRequirementsSchema }, default: {} })
  jobRequirements: JobRequirement;

  @Prop({ type: [ExperienceSchema], default: [] })
  experience: Experience[];

  @Prop({ type: [EducationSchema], default: [] })
  education: Education[];

  @Prop({ type: [CourseSchema], default: [] })
  course: Course[];

  @Prop({ type: [{ language: String, grade: String }], default: [] })
  langGrades: LangGrade[];

  @Prop({ type: [String], default: [] })
  hardSkills: string[];

  @Prop({ type: [String], default: [] })
  softSkills: string[];

  @Prop({ type: [String], enum: DrivingGrade, default: [] })
  drivingLicence: DrivingGrade[];

  @Prop({ default: false })
  criminalRecords: boolean;

  @Prop({ type: String, default: 'empty' })
  extraInfo: string;

  @Prop({ type: Number, default: null })
  telegramId: number;

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
  position: Types.ObjectId;

  @Prop({ default: 0 })
  salary: number;

  @Prop({ enum: EmployeeStatusEnum, required: true })
  employeeStatus: EmployeeStatusEnum;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
