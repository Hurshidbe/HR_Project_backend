import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';
import { Transform } from 'class-transformer';
import mongoose from 'mongoose';

export class CreatePositionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  departmentId: string;
}
