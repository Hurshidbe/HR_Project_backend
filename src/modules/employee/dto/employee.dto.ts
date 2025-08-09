import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { DrivingLicense, EmployeeStatus, Region, Sex } from 'src/enums/enums';
import {
  CourseDto,
  EducationDto,
  ExperienceDto,
  JobRequirementDto,
  LangGradeDto,
} from 'src/modules/candidates/dto/candidate.dtos';
import { HardSkill } from 'src/types/common.types';

export class CreateEmployeeDto {
  @IsString()
  fullName: string;

  @IsEnum(Sex)
  sex: Sex;

  @Type(() => Date)
  @IsDate()
  birthDate: string;

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

  @ValidateNested({ each: true })
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
  hardSkills: HardSkill[];

  @IsArray()
  softSkills: string[];

  @IsArray()
  @IsEnum(DrivingLicense, { each: true })
  drivingLicence: DrivingLicense[];

  @IsBoolean()
  criminalRecords: boolean;

  @IsString()
  extraInfo: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsNumber()
  salary: number;

  @IsEnum(EmployeeStatus)
  employeeStatus: EmployeeStatus;

  // don't recive from client
  @IsNumber()
  @IsOptional()
  telegramId?: number;
}
