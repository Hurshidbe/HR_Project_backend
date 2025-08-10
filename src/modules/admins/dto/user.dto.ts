import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/enums/enums';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}

export class createAdminDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @IsNotEmpty()
  @Length(4, 8)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
