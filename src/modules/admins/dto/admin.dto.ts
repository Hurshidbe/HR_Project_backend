import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/enums/enums';

export class LoginDto {
  @ApiProperty({ example: 'admin' })
  username: string;

  @ApiProperty({ example: 'admin' })
  password: string;
}

export class createAdminDto {
  @ApiProperty({ example: 'hurshidbe' })
  username: string;

  @ApiProperty({ example: '1111' })
  password: string;

  @ApiProperty({ example: 'admin' })
  role: UserRole;
}
