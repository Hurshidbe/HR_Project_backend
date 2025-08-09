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
import { CandidateStatus, DrivingLicense, Region, Sex } from 'src/enums/enums';
import { HardSkill } from 'src/types/common.types';

/**
 * DTO for creating a new candidate application
 */
export class CreateCandidateDto {
  @IsString({ message: 'Full name must be a string' })
  fullName: string;

  @IsEnum(Sex, { message: 'Sex must be either male or female' })
  sex: Sex;

  @Type(() => Date)
  @IsDate({ message: 'Birth date must be a valid date' })
  birthDate: string;

  @IsString({ message: 'Phone number must be a string' })
  phoneNumber: string;

  @IsString({ message: 'Email must be a string' })
  email: string;

  @IsString({ message: 'Telegram username must be a string' })
  tgUsername: string;

  @IsEnum(Region, { message: 'Region must be a valid region' })
  region: Region;

  @IsString({ message: 'Address must be a string' })
  address: string;

  @IsString({ message: 'Occupation must be a string' })
  occupation: string;

  @ValidateNested({ message: 'Job requirement must be valid' })
  @Type(() => JobRequirementDto)
  jobRequirement: JobRequirementDto;

  @IsArray({ message: 'Experience must be an array' })
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  experience: ExperienceDto[];

  @IsArray({ message: 'Education must be an array' })
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education: EducationDto[];

  @IsArray({ message: 'Courses must be an array' })
  @ValidateNested({ each: true })
  @Type(() => CourseDto)
  course: CourseDto[];

  @IsArray({ message: 'Language grades must be an array' })
  @ValidateNested({ each: true })
  @Type(() => LangGradeDto)
  langGrades: LangGradeDto[];

  @IsArray({ message: 'Hard skills must be an array' })
  hardSkills: HardSkill[];

  @IsArray({ message: 'Soft skills must be an array' })
  softSkills: string[];

  @IsArray({ message: 'Driving license must be an array' })
  @IsEnum(DrivingLicense, {
    each: true,
    message: 'Each driving license must be a valid category',
  })
  drivingLicence: DrivingLicense[];

  @IsBoolean({ message: 'Criminal records must be a boolean' })
  criminalRecords: boolean;

  @IsString({ message: 'Extra info must be a string' })
  extraInfo: string;

  // Server-side only fields - not received from client
  @IsEnum(CandidateStatus, {
    message: 'Status must be a valid candidate status',
  })
  @IsOptional()
  status?: CandidateStatus;

  @IsNumber({}, { message: 'Telegram ID must be a number' })
  @IsOptional()
  telegramId?: number;
}
