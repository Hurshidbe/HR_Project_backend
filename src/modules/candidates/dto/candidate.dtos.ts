import { EmployeeStatusEnum, Region, Sex } from 'src/enums/enums';
import { Department } from 'src/modules/department/entities/department.entity';
import { Position } from 'src/modules/position/entities/position.entity';

import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
export class JobRequirementDto {
  @IsString()
  @IsNotEmpty()
  position: string;

  salary: number;
}

export class CourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  profession: string;

  @Type(() => Date)
  @IsDate()
  from: Date;

  @Type(() => Date)
  @IsDate()
  to: Date;
}

export class EducationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
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
  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  @IsString()
  company: string;

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
  @ValidateNested()
  @Type(() => Department)
  @IsNotEmpty()
  department: Department;

  @ValidateNested()
  @Type(() => Position)
  @IsNotEmpty()
  position: Position;

  @IsNumber()
  @IsOptional()
  salary: number;

  @IsEnum(EmployeeStatusEnum)
  @IsNotEmpty()
  employeeStatus: EmployeeStatusEnum;
}
