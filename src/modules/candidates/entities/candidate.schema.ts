import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DrivingGrade, Statuses } from 'src/enums/enums';
import { Document } from 'mongoose';
import {
  Course,
  CourseSchema,
  Education,
  EducationSchema,
  Experience,
  ExperienceSchema,
  JobRequirement,
  JobRequirementsSchema,
  LangGrade,
  PersonalInfo,
  PersonalInfoSchema,
} from 'src/types/object.types';

@Schema({ timestamps: true })
export class Candidate extends Document {
  @Prop({ type: PersonalInfoSchema, default: {} })
  personalInfo: PersonalInfo;

  @Prop({ type: JobRequirementsSchema, default: {} })
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

  @Prop({ default: '' })
  extraInfo: string;

  @Prop({ default: Statuses.process })
  status: Statuses;

  @Prop({ type: Number, default: null })
  telegramId: number;
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);
