import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DrivingGrade, Region, Sex, Statuses } from 'src/enums/enums';
import { Document } from 'mongoose';
import {
  Course,
  Education,
  Experience,
  JobRequirements,
  LangGrade,
  PersonalInfo,
} from 'src/types/object.types';

//Candidate schema
@Schema({ timestamps: true })
export class Candidate extends Document {
  @Prop({ type: PersonalInfo, default: [] })
  personalInfo: PersonalInfo[];

  @Prop({ type: JobRequirements })
  jobRequirements: JobRequirements[];

  @Prop({ type: [Experience], default: [] })
  experience: Experience[];

  @Prop({ type: [Education], default: [] })
  education: Education[];

  @Prop({ type: [Course], default: [] })
  course: Course[];

  @Prop({ type: [LangGrade], default: [] })
  langGrades: LangGrade[];

  @Prop()
  hardSkills: string[];

  @Prop({ type: [String], default: [] })
  softSkills: string[];

  @Prop({ type: String, default: DrivingGrade.No })
  drivingLicence: DrivingGrade[];

  @Prop({ default: false })
  criminalRecords: boolean;

  @Prop()
  extraInfo: string;

  // @Prop({ type: [String], default: [], required: false })
  // certificates: string[];

  @Prop({ default: Statuses.process })
  status: Statuses;
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);
