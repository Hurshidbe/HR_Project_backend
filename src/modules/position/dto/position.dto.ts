import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePositionDto {
  @ApiProperty({ example: 'assistant' })
  @IsString()
  title: string;

  @IsString()
  @ApiProperty({ example: '687b98174c9de88da66042d1' })
  departmentId: string;
}
