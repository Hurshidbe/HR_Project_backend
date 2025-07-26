import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LangGradeEnum, Region, Sex } from 'src/enums/enums';
@Schema({ _id: false })
export class LangGrade {
  @Prop()
  language: string;

  @Prop()
  grade: LangGradeEnum;
}
export const LangGradeSchema = SchemaFactory.createForClass(LangGrade);

@Schema({ _id: false })
export class Experience {
  @Prop()
  position: string;

  @Prop()
  company: string;

  @Prop()
  salary: string;

  @Prop()
  from: Date;

  @Prop()
  to: Date;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
@Schema({ _id: false })
export class Education {
  @Prop()
  name: string;

  @Prop()
  speciality: string;

  @Prop()
  from: Date;

  @Prop()
  to: Date;
}
export const EducationSchema = SchemaFactory.createForClass(Education);

@Schema({ _id: false })
export class Course {
  @Prop()
  name: string;

  @Prop()
  profession: string;

  @Prop()
  from: Date;

  @Prop()
  to: Date;
}
export const CourseSchema = SchemaFactory.createForClass(Course);

@Schema({ _id: false })
export class PersonalInfo {
  @Prop()
  fullName: string;

  @Prop()
  sex: Sex;

  @Prop()
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
}

export const PersonalInfoSchema = SchemaFactory.createForClass(PersonalInfo);

@Schema({ _id: false })
export class JobRequirement {
  @Prop()
  position: string;

  @Prop()
  salary: string;
}
export const JobRequirementsSchema =
  SchemaFactory.createForClass(JobRequirement);
