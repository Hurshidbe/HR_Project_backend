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
import { ApiProperty } from '@nestjs/swagger';
import { extraInfo, hardSkill } from 'src/types/object.types';

export class CreateCandidateDto {
  @ValidateNested()
  @Type(() => PersonalInfoDto)
  @ApiProperty({
    type: [PersonalInfoDto],
    example: [
      {
        fullName: 'Ali Karimov',
        sex: 'male',
        birthDate: '2000-01-01',
        phoneNumber: '+998901234567',
        email: 'ali@gmail.com',
        tgUsername: 'alikarim',
        region: 'Toshkent',
        address: 'Olmazor tumani',
        occupation: 'Frontend Developer',
      },
    ],
  })
  personalInfo: PersonalInfoDto[];

  @ValidateNested()
  @Type(() => JobRequirementDto)
  @ApiProperty({
    type: JobRequirementDto,
    example: {
      position: 'Backend Developer',
      salary: '1000',
    },
  })
  jobRequirements: JobRequirementDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  @ApiProperty({
    type: [ExperienceDto],
    example: [
      {
        position: 'Engineer',
        company: 'ABC Corp',
        salary: '1000',
        from: '2020-01-01',
        to: '2022-01-01',
      },
    ],
  })
  experience: ExperienceDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  @ApiProperty({
    type: [EducationDto],
    example: [
      {
        name: 'TATU',
        speciality: 'Computer Science',
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
    type: [CourseDto],
    example: [
      {
        name: "Najot Ta'lim",
        profession: 'Backend',
        from: '2023-01-01',
        to: '2023-12-01',
      },
    ],
  })
  course: CourseDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LangGradeDto)
  @ApiProperty({
    type: [LangGradeDto],
    example: [
      { language: 'English', grade: 'B2' },
      { language: 'Russian', grade: 'A1' },
    ],
  })
  langGrades: LangGradeDto[];

  @IsArray()
  @ApiProperty({ example: [{ hardSkill: 'eshak minish' }] })
  hardSkills: hardSkill[];

  @IsArray()
  @ApiProperty({ example: ['eshak minish'] })
  softSkills: string[];

  @IsArray()
  @IsEnum(DrivingGrade, { each: true })
  @ApiProperty({ example: ['No'] })
  drivingLicence: DrivingGrade[];

  @IsBoolean()
  @ApiProperty({ example: false })
  criminalRecords: boolean;

  @IsArray()
  @ApiProperty({ example: [{ more: 'salomaat' }] })
  extraInfo: extraInfo[];
  // don't recive from client
  @IsEnum(Statuses)
  @IsOptional()
  status?: Statuses;

  // don't recive from client
  @IsNumber()
  @IsOptional()
  telegramId?: number;
}
