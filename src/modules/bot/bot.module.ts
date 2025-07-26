import { forwardRef, Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotUpdate } from './bot';
import { BotService } from './bot.service';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Candidate,
  CandidateSchema,
} from '../candidates/entities/candidate.schema';
import { Employee, EmployeeSchema } from '../employee/entities/employee.schema';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.BOT_TOKEN || '',
    }),
    MongooseModule.forFeature([
      { name: Candidate.name, schema: CandidateSchema },
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  providers: [
    {
      provide: BotService,
      useClass: BotService,
    },
    {
      provide: MessageService,
      useClass: MessageService,
    },
  ],
  exports: [BotService],
})
export class BotModule {}
