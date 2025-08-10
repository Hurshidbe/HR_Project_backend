import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './entities/user.schema';
import {
  Candidate,
  CandidateSchema,
} from '../candidates/entities/candidate.schema';
import { CandidatesModule } from '../candidates/candidates.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MessageService } from '../bot/message.service';
import { BotService } from '../bot/bot.service';
import { BotModule } from '../bot/bot.module';

@Module({
  controllers: [UsersController],
  imports: [
    BotModule,
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: Candidate.name, schema: CandidateSchema },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService, MongooseModule],
})
export class UserModule {}
