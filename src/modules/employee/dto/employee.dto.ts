import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { DrivingGrade, EmployeeStatusEnum } from 'src/enums/enums';
import {
  PersonalInfoDto,
  CourseDto,
  EducationDto,
  ExperienceDto,
  JobRequirementDto,
  LangGradeDto,
} from 'src/modules/candidates/dto/candidate.dtos';

export class CreateEmployeeDto {
  @ValidateNested()
  @Type(() => PersonalInfoDto)
  @ApiProperty({
    example: {
      fullName: 'Ali Karimov',
      sex: 'male',
      birthDate: '2000-01-01',
      phoneNumber: '+998901234567',
      email: 'ali@gmail.com',
      tgUsername: 'alikarim',
      region: 'TASHKENT',
      address: 'Olmazor',
      occupation: 'Frontend Developer',
    },
  })
  personalInfo: [PersonalInfoDto];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => JobRequirementDto)
  @ApiProperty({
    example: [
      {
        position: 'Team Lead',
        salary: '1500',
      },
    ],
  })
  jobRequirements: JobRequirementDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  @ApiProperty({
    example: [
      {
        position: 'Developer',
        company: 'ABC Corp',
        salary: '1200',
        from: '2021-01-01',
        to: '2023-01-01',
      },
    ],
  })
  experience: ExperienceDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  @ApiProperty({
    example: [
      {
        name: 'TATU',
        speciality: 'CS',
        from: '2016-09-01',
        to: '2020-06-01',
      },
    ],
  })
  education: EducationDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CourseDto)
  @ApiProperty({
    example: [
      {
        name: "Najot Ta'lim",
        profession: 'Backend',
        from: '2022-01-01',
        to: '2022-12-01',
      },
    ],
  })
  course: CourseDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LangGradeDto)
  @ApiProperty({
    example: [
      { language: 'English', grade: 'C1' },
      { language: 'Russian', grade: 'B1' },
    ],
  })
  langGrades: LangGradeDto[];

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ example: ['NestJS', 'PostgreSQL'] })
  hardSkills: string[];

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ example: ['Teamwork', 'Leadership'] })
  softSkills: string[];

  @IsArray()
  @IsEnum(DrivingGrade, { each: true })
  @ApiProperty({ example: ['No'] })
  drivingLicence: DrivingGrade[];

  @IsBoolean()
  @ApiProperty({ example: false })
  criminalRecord: boolean;

  @IsString()
  @ApiProperty({ example: ['I am a passionate developer.'] })
  extraInfo: string[];

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 123456789 })
  telegramId?: number;

  @IsMongoId()
  @ApiProperty({ example: '60f7f9f9c2b3c712d0f1c123' })
  department: string;

  @IsMongoId()
  @ApiProperty({ example: '60f7f9f9c2b3c712d0f1c456' })
  position: string;

  @IsNumber()
  @ApiProperty({ example: 1000 })
  salary: number;

  @IsEnum(EmployeeStatusEnum)
  employeeStatus: EmployeeStatusEnum;
}
