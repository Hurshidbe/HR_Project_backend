import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  CourseDto,
  EducationDto,
  ExperienceDto,
  JobRequirementDto,
  LangGradeDto,
} from './candidate.dtos';
import { Type } from 'class-transformer';
import { CandidateStatuses, DrivingGrade, Region, Sex } from 'src/enums/enums';

export class CreateCandidateDto {
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

  @ValidateNested()
  @Type(() => JobRequirementDto)
  jobRequirement: JobRequirementDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  experience: ExperienceDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education: EducationDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CourseDto)
  course: CourseDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LangGradeDto)
  langGrades: LangGradeDto[];

  @IsArray()
  hardSkills: string[];

  @IsArray()
  softSkills: string[];

  @IsArray()
  @IsEnum(DrivingGrade, { each: true })
  drivingLicence: DrivingGrade[];

  @IsBoolean()
  criminalRecords: boolean;

  @IsString()
  extraInfo: string;

  // don't recive from client
  @IsEnum(CandidateStatuses)
  @IsOptional()
  status?: CandidateStatuses;

  // don't recive from client
  @IsNumber()
  @IsOptional()
  telegramId?: number;
}
