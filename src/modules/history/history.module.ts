import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SalaryHistory,
  SalaryHistorySchema,
} from './entities/salaryHistory.schema';
import { Position, PositionSchema } from '../position/entities/position.entity';
import { Employee, EmployeeSchema } from '../employee/entities/employee.schema';
import { EmployeeService } from '../employee/employee.service';
import {
  PositionHistory,
  PositionHistorySchema,
} from './entities/positionHistory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: PositionHistory.name, schema: PositionHistorySchema },
      { name: SalaryHistory.name, schema: SalaryHistorySchema },
    ]),
  ],
  controllers: [HistoryController],
  providers: [HistoryService, EmployeeService],
  exports: [MongooseModule],
})
export class HistoryModule {}
