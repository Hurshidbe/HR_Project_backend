import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePositionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  departmentId: string;
}
