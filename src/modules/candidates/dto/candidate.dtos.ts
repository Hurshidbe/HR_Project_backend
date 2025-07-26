import { ApiProperty } from '@nestjs/swagger';
import { EmployeeStatusEnum, Region, Sex } from 'src/enums/enums';
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
import { Statuses, DrivingGrade } from 'src/enums/enums';
export class JobRequirementDto {
  @IsString()
  position: string;

  @IsString()
  salary: string;
}

export class PersonalInfoDto {
  @IsString()
  fullName: string;

  @IsEnum(Sex)
  sex: Sex;

  @Type(() => Date)
  @IsDate()
  birthDate: Date;

  @IsString()
  phoneNumber: string;

  @IsString()
  email: string;

  @IsString()
  tgUsername: string;

  @IsEnum(Region)
  region: Region;

  @IsString()
  address: string;

  @IsString()
  occupation: string;
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
  @ApiProperty({ example: '687b90e693dd4148b2a601e2' })
  department: Department;
  @ApiProperty({ example: 10000000 })
  salary: number;

  @ApiProperty({ example: '687b90e693dd4148b2a601e2' })
  position: Position;
  @ApiProperty({ example: EmployeeStatusEnum.probation })
  employeeStatus: EmployeeStatusEnum;
}
