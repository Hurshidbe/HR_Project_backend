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
export class LangGradeSchema {
  language: string;
  grade: LangGrade;
}

// Experience subdocument schema
export class Experience {
  Position: string;
  Company: string;
  Salary: string;
  StartDate: Date;
  EndDate: Date;
}

// Education subdocument schema
export class Education {
  Name: string;
  Speciality: string;
  StartedDate: Date;
  EndedDate: Date;
}

// Courses subdocument schema

export class Course {
  Name: string;
  Profession: string;
}

export class PersonalInfo {
  photo: string;
  fullName: string;
  sex: Sex;
  birthDate: Date;
  phoneNumber: string;
  email: string;
  tgUsername: string;
  region: Region;
  address: string;
  occupation: string;
}

export class JobRequirements {
  position: string;
  salary: string;
}

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

  @Prop({ type: [LangGradeSchema], default: [] })
  langGrades: LangGradeSchema[];

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
