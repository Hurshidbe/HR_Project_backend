import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LanguageLevel } from 'src/enums/enums';

/**
 * Language proficiency information
 */
@Schema({ _id: false })
export class LangGrade {
  @Prop({ required: true })
  language: string;

  @Prop({ enum: LanguageLevel, required: true })
  grade: LanguageLevel;
}
export const LangGradeSchema = SchemaFactory.createForClass(LangGrade);

/**
 * Work experience information
 */
@Schema({ _id: false })
export class Experience {
  @Prop({ required: true })
  position: string;

  @Prop({ required: true })
  company: string;

  @Prop()
  salary: string;

  @Prop({ type: Date, required: true })
  from: Date;

  @Prop({ type: Date, required: true })
  to: Date;
}
export const ExperienceSchema = SchemaFactory.createForClass(Experience);

/**
 * Educational background information
 */
@Schema({ _id: false })
export class Education {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  speciality: string;

  @Prop({ type: Date, required: true })
  from: Date;

  @Prop({ type: Date, required: true })
  to: Date;
}
export const EducationSchema = SchemaFactory.createForClass(Education);

/**
 * Course/certification information
 */
@Schema({ _id: false })
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  profession: string;

  @Prop({ type: Date, required: true })
  from: Date;

  @Prop({ type: Date, required: true })
  to: Date;
}
export const CourseSchema = SchemaFactory.createForClass(Course);

/**
 * Job requirement preferences
 */
@Schema({ _id: false })
export class JobRequirement {
  @Prop({ required: true })
  position: string;

  @Prop({ required: true })
  salary: string;
}
export const JobRequirementsSchema = SchemaFactory.createForClass(JobRequirement);

/**
 * Hard skill information
 */
@Schema({ _id: false })
export class HardSkill {
  @Prop({ required: true })
  name: string;

  @Prop({
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    default: 'Beginner'
  })
  level: string;

  @Prop({ min: 0 })
  yearsOfExperience?: number;
}
export const HardSkillSchema = SchemaFactory.createForClass(HardSkill);

// Legacy export for backward compatibility
export const hardSkill = HardSkill;
export const hardSkillSchema = HardSkillSchema;
