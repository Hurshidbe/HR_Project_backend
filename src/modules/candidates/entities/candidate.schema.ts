import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CandidateStatus, DrivingLicense, Region, Sex } from 'src/enums/enums';
import { Document } from 'mongoose';
import {
  Course,
  CourseSchema,
  Education,
  EducationSchema,
  Experience,
  ExperienceSchema,
  HardSkill,
  HardSkillSchema,
  JobRequirement,
  JobRequirementsSchema,
  LangGrade,
} from 'src/types/object.types';

@Schema({ timestamps: true })
export class Candidate extends Document {
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

  @Prop({ type: JobRequirementsSchema, default: {} })
  jobRequirement: JobRequirement;

  @Prop({ type: [ExperienceSchema], default: [] })
  experience: Experience[];

  @Prop({ type: [EducationSchema], default: [] })
  education: Education[];

  @Prop({ type: [CourseSchema], default: [] })
  course: Course[];

  @Prop({ type: [{ language: String, grade: String }], default: [] })
  langGrades: LangGrade[];

  @Prop({ type: [HardSkillSchema], default: [] })
  hardSkills: HardSkill[];

  @Prop({ type: [String], default: [] })
  softSkills: string[];

  @Prop({ type: [String], enum: DrivingLicense, default: [] })
  drivingLicence: DrivingLicense[];

  @Prop({ default: false })
  criminalRecords: boolean;

  @Prop({ type: String, default: [] })
  extraInfo: string;

  @Prop({ default: CandidateStatus.PENDING })
  status: CandidateStatus;

  @Prop({ type: Number, default: null })
  telegramId: number;
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);
