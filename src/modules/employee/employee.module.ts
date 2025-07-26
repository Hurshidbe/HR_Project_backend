import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './entities/employee.schema';
import {
  SalaryHistory,
  SalaryHistorySchema,
} from '../history/entities/salaryHistory.schema';
import { PositionSchema } from '../position/entities/position.entity';
import { HistoryService } from '../history/history.service';
import { HistoryModule } from '../history/history.module';
import { PositionHistory } from '../history/entities/positionHistory.schema';
import { PositionService } from '../position/position.service';
import { PositionModule } from '../position/position.module';

@Module({
  imports: [
    HistoryModule,
    PositionModule,
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: PositionHistory.name, schema: PositionSchema },
      { name: SalaryHistory.name, schema: SalaryHistorySchema },
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, HistoryService, PositionService],
})
export class EmployeeModule {}
