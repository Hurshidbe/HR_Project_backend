import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
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
  PersonalInfoDto,
} from './candidate.dtos';
import { Type } from 'class-transformer';
import { DrivingGrade, Statuses } from 'src/enums/enums';

export class CreateCandidateDto {
  @ValidateNested()
  @Type(() => PersonalInfoDto)
  personalInfo: PersonalInfoDto;

  @ValidateNested()
  @Type(() => JobRequirementDto)
  jobRequirements: JobRequirementDto;

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
  @IsString({ each: true })
  hardSkills: string[];

  @IsArray()
  @IsString({ each: true })
  softSkills: string[];

  @IsArray()
  @IsEnum(DrivingGrade, { each: true })
  drivingLicence: DrivingGrade[];

  @IsBoolean()
  criminalRecords: boolean;

  @IsString()
  extraInfo: string;

  // don't recive from client
  @IsEnum(Statuses)
  @IsOptional()
  status?: Statuses;

  // don't recive from client
  @IsNumber()
  @IsOptional()
  telegramId?: number;
}
