import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './entities/admin.schema';
import {
  Candidate,
  CandidateSchema,
} from '../candidates/entities/candidate.schema';
import { CandidatesModule } from '../candidates/candidates.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  imports: [
    CandidatesModule,
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: Candidate.name, schema: CandidateSchema },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService, MongooseModule],
})
export class AdminsModule {}
