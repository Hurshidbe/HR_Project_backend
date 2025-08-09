import { EmployeeStatus, Region, Sex } from 'src/enums/enums';
import { Department } from 'src/modules/department/entities/department.entity';
import { Position } from 'src/modules/position/entities/position.entity';

import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
export class JobRequirementDto {
  @IsString()
  position: string;

  @IsString()
  salary: string;
}

export class CourseDto {
  @IsString()
  name: string;

  @IsString()
  profession: string;

  @Type(() => Date)
  @IsDate()
  from: Date;

  @Type(() => Date)
  @IsDate()
  to: Date;
}

export class EducationDto {
  @IsString()
  name: string;

  @IsString()
  speciality: string;

  @Type(() => Date)
  @IsDate()
  from: Date;

  @Type(() => Date)
  @IsDate()
  to: Date;
}

export class ExperienceDto {
  @IsString()
  position: string;

  @IsString()
  company: string;

  @IsString()
  salary: string;

  @Type(() => Date)
  @IsDate()
  from: Date;

  @Type(() => Date)
  @IsDate()
  to: Date;
}

export class LangGradeDto {
  @IsString()
  language: string;

  @IsString()
  grade: string;
}

export class AcceptCandidateDto {
  department: Department;
  salary: number;
  position: Position;
  employeeStatus: EmployeeStatus;
}
