import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Candidate, CandidateSchema } from './entities/candidate.schema';
import { Employee, EmployeeSchema } from '../employee/entities/employee.schema';
import { EmployeeModule } from '../employee/employee.module';
import { HistoryModule } from '../history/history.module';
import { MessageService } from '../bot/message.service';
import { BotService } from '../bot/bot.service';
import { UserModule } from '../admins/users.module';
import { BotModule } from '../bot/bot.module';
import { HistoryService } from '../history/history.service';

@Module({
  controllers: [CandidatesController],
  imports: [
    EmployeeModule,
    HistoryModule,
    UserModule,
    BotModule,
    MongooseModule.forFeature([
      { name: Candidate.name, schema: CandidateSchema },
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  exports: [CandidatesService, HistoryService],
  providers: [CandidatesService, HistoryService, MessageService, BotService],
})
export class CandidatesModule {}
