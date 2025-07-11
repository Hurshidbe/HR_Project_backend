import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  DrivingGrade,
  LangGrade,
  Region,
  Sex,
  Statuses,
} from 'src/enums/enums';
import { Document } from 'mongoose';

// 1. LangGrade subdocument schema
@Schema({ _id: false })
export class LangGradeSchema {
  @Prop({ required: true })
  language: string;

  @Prop({ type: String, enum: LangGrade, required: true })
  grade: LangGrade;
}
export const LangGradeSchemaFactory =
  SchemaFactory.createForClass(LangGradeSchema);

// 2. Candidate schema
@Schema({ timestamps: true })
export class Candidate extends Document {
  @Prop({ required: false })
  photo: string;

  @Prop()
  fullName: string;

  @Prop({ type: String, enum: Sex })
  sex: Sex;

  @Prop()
  birthDate: Date;

  @Prop()
  phoneNumber: string;

  @Prop()
  email: string;

  @Prop()
  tgUsername: string;

  @Prop({ type: String, enum: Region })
  region: Region;

  @Prop()
  address: string;

  @Prop()
  profession: string;

  @Prop()
  workPosition: string;

  @Prop()
  workSalary: string;

  @Prop()
  experiencePosition: string;

  @Prop()
  experienceCompany: string;

  @Prop()
  experienceSalary: string;

  @Prop()
  experienceStart: Date;

  @Prop()
  experienceEnd: Date;

  @Prop()
  educationName: string;

  @Prop()
  educationSpeciality: string;

  @Prop()
  educationStarted: Date;

  @Prop()
  educationEnded: Date;

  @Prop()
  courseName: string;

  @Prop()
  courseProfession: string;

  // ✅ LangGrades as subdocument array
  @Prop({ type: [LangGradeSchema], default: [] })
  langGrades: LangGradeSchema[];

  @Prop({ type: [String], default: [] })
  computerSkills: string[];

  @Prop()
  proSkills: string;

  @Prop({ type: [String], default: [] })
  softSkills: string[];

  @Prop({ type: String, default: DrivingGrade.No })
  drivingGrade: DrivingGrade;

  @Prop({ default: false })
  convicted: boolean;

  @Prop()
  moreInfo: string;

  @Prop({ type: [String], default: [], required: false })
  certificates: string[];

  @Prop({ default: Statuses.process })
  status: Statuses;
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);
