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
  jobRequirements: JobRequirements[];

  @Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return [];
    }
  })
  @IsArray()
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
  @IsString({ each: true })
  softSkills: string[];

  @IsEnum(DrivingGrade)
  drivingLicence: DrivingGrade;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  criminalRecord: boolean;

  @IsString()
  extraInfo: string;

  @IsOptional()
  @IsEnum(Statuses)
  status?: Statuses;

  // @IsString()
  // certificates: string[];
}

export class AcceptEmployeeDto {
  department: Department;
  salary: number;
  position: Position;
  EmployeeStatus: EmployeeStatusEnum;
}
