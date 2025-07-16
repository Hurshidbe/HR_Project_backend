import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DrivingGrade, Region, Sex } from 'src/enums/enums';
import { LangGradeDto } from 'src/modules/candidates/dto/candidate.dto';
import {
  Course,
  Education,
  Experience,
  JobRequirements,
  PersonalInfo,
} from 'src/modules/candidates/entities/candidate.schema';

export class CreateEmployeeDto {
  @IsArray()
  personalInfo: PersonalInfo[];

  @Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return [];
    }
  })
  @IsArray()
  @ValidateNested({ each: true })
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
  @IsString()
  hardSkills: string;

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

  // @IsString()
  // certificates: string[];
}
