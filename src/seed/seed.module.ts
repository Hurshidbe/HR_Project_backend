import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/modules/admins/entities/admin.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import {
  Candidate,
  CandidateSchema,
} from 'src/modules/candidates/entities/candidate.schema';
import { UsersService } from 'src/modules/admins/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URL || ''),
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: Candidate.name, schema: CandidateSchema },
    ]),
    JwtModule.register({ secret: process.env.JWT || 'secret' }),
  ],
  providers: [UsersService],
})
export class SeedModule {}
