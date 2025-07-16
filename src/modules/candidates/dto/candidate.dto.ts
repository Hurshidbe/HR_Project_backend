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
  LangGrade,
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
} from '../entities/candidate.schema';

export class LangGradeDto {
  @IsString()
  language: string;

  @IsString()
  grade: string;
}

export class CreateCandidateDto {
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value.trim());
      } catch (e) {
        console.error('personalInfo parse error:', e);
        return [];
      }
    }
    return value;
  })
  @IsArray()
  personalInfo: PersonalInfo[];

  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value.trim());
      } catch (e) {
        console.error('jobRequirements parse error', e);
        return [];
      }
    }
    return value;
  })
  @IsArray()
  jobRequirements: JobRequirements[];

  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value.trim());
      } catch (e) {
        console.error('langGrades parse error:', e);
        return [];
      }
    }
    return value;
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
  computerSkills: string[];

  @IsString()
  proSkills: string[];

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
  drivingGrade: DrivingGrade;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  convicted: boolean;

  @IsString()
  moreInfo: string;

  @IsOptional()
  @IsEnum(Statuses)
  status?: Statuses;

  @IsString()
  certificates: string[];
}

export class AcceptEmployeeDto {
  department: Department;
  salary: number;
  position: Position;
  EmployeeStatus: EmployeeStatusEnum;
}
