import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Candidate, CandidateSchema } from './entities/candidate.schema';
import { EmployeeService } from '../employee/employee.service';
import { Employee, EmployeeSchema } from '../employee/entities/employee.schema';
import { HistoryModule } from '../history/history.module';
import { HistoryService } from '../history/history.service';

@Module({
  controllers: [CandidatesController],
  imports: [
    HistoryModule,
    MongooseModule.forFeature([
      { name: Candidate.name, schema: CandidateSchema },
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  exports: [CandidatesService, EmployeeService, HistoryService],
  providers: [CandidatesService, EmployeeService, HistoryService],
})
export class CandidatesModule {}
