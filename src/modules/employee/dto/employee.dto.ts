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

export class CreateEmployeeDto {
  @IsOptional()
  @IsString()
  photo?: string;

  @IsString()
  fullName: string;

  @IsEnum(Sex)
  sex: Sex;

  @IsDateString()
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
  profession: string;

  @IsString()
  workPosition: string;

  @IsString()
  workSalary: string;

  @IsString()
  experiencePosition: string;

  @IsString()
  experienceCompany: string;

  @IsString()
  experienceSalary: string;

  @IsDateString()
  experienceStart: Date;

  @IsDateString()
  experienceEnd: Date;

  @IsString()
  educationName: string;

  @IsString()
  educationSpeciality: string;

  @IsDateString()
  educationStarted: Date;

  @IsDateString()
  educationEnded: Date;

  @IsString()
  courseName: string;

  @IsString()
  courseProfession: string;

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
  @IsString({ each: true })
  computerSkills: string[];

  @IsString()
  proSkills: string;

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

  @IsString()
  certificates: string[];
}
