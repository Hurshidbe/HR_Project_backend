import { IsEnum, IsString, Length } from 'class-validator';
import { UserRole } from 'src/enums/enums';

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class createAdminDto {
  @IsString()
  username: string;

  @Length(4, 8)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
