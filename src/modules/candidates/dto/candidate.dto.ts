import {
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsDateString,
  IsArray,
  ValidateNested,
  isString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import {
  DrivingGrade,
  EmployeeStatusEnum,
  LangGradeEnum,
  Region,
  Sex,
  Statuses,
} from 'src/enums/enums';
import { Department } from 'src/modules/department/entities/department.entity';
import { Position } from 'src/modules/position/entities/position.entity';
import { Employee } from 'src/modules/employee/entities/employee.schema';
import {
  Course,
  Education,
  Experience,
  JobRequirements,
  PersonalInfo,
} from 'src/types/object.types';
import { ApiProperty } from '@nestjs/swagger';

export class LangGradeDto {
  @IsString()
  language: string;

  @IsString()
  grade: string;
}

export class CreateCandidateDto {
  @Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return [];
    }
  })
  @IsArray()
  @ApiProperty({
    example: `[{ "fullName": "Ali Karimov", "sex": "male", "birthDate": "2000-01-01", "phoneNumber": "+998901234567", "email": "ali@gmail.com", "tgUsername": "@alikarim", "region": "TASHKENT", "address": "Olmazor", "occupation": "Frontend" }]`,
  })
  personalInfo: PersonalInfo[];

  @Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return [];
    }
  })
  @ValidateNested({ each: true })
  @IsArray()
  @ApiProperty({
    example: `[{ "position": "Backend Developer", "salary": "1000" }]`,
  })
  jobRequirements: JobRequirements[];

  @Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return [];
    }
  })
  @IsArray()
  @ApiProperty({
    example: `[{ "language": "English", "grade": "B2" },{ "language": "Russian", "grade": "A1" }]`,
  })
  @ValidateNested({ each: true })
  @Type(() => LangGradeDto)
  langGrades: LangGradeDto[];

  @Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return [];
    }
  })
  @IsArray()
  @ApiProperty({
    example: `[{ "position": "Engineer", "company": "ABC Corp", "salary": "1000", "from": "2020-01-01", "to": "2022-01-01" }]`,
  })
  @ValidateNested({ each: true })
  @Type(() => Experience)
  experience: Experience[];

  @Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return [];
    }
  })
  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty({
    example: `[{ "name": "Najot Ta'lim", "profession": "Backend", "from": "2023-01-01", "to": "2023-12-01" }]`,
  })
  @Type(() => Course)
  course: Course[];

  @Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return [];
    }
  })
  @IsArray()
  @ApiProperty({
    example:
      '[{ "name": "TATU", "speciality": "CS", "from": "2016-09-01", "to": "2020-06-01" }]',
  })
  @ValidateNested({ each: true })
  @Type(() => Education)
  education: Education[];

  @Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return [];
    }
  })
  @IsArray()
  @ApiProperty({ example: '' })
  @IsString({ each: true })
  hardSkills: string[];

  @Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return [];
    }
  })
  @IsArray()
  @ApiProperty({ example: '' })
  @IsString({ each: true })
  softSkills: string[];

  @IsEnum(DrivingGrade)
  @ApiProperty({ example: 'No' })
  drivingLicence: DrivingGrade;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @ApiProperty({ example: 'false' })
  criminalRecord: boolean;

  @IsString()
  @ApiProperty({ example: 'salomaaat' })
  extraInfo: string;

  @IsOptional()
  @IsEnum(Statuses)
  status?: Statuses;

  // @IsString()
  // certificates: string[];
}

export class AcceptEmployeeDto {
  @ApiProperty({ example: '687b90e693dd4148b2a601e2' })
  department: Department;
  @ApiProperty({ example: 10000000 })
  salary: number;

  @ApiProperty({ example: '687b90e693dd4148b2a601e2' })
  position: Position;
  @ApiProperty({ example: EmployeeStatusEnum.probation })
  EmployeeStatus: EmployeeStatusEnum;
}
