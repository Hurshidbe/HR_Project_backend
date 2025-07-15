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
import { LangGradeSchema } from 'src/modules/candidates/entities/candidate.schema';
import { Department } from 'src/modules/department/entities/department.entity';
import { Position } from 'src/modules/position/entities/position.entity';

@Schema({ timestamps: true })
export class Employee {
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

  @Prop({ type: [LangGradeSchema], default: [] })
  langGrades: LangGradeSchema[];

  @Prop({ type: [String], default: [] })
  computerSkills: string[];

  @Prop()
  proSkills: string[];

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
