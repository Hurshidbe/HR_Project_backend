import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SalaryHistory,
  SalaryHistorySchema,
} from './entities/salaryHistory.schema';

import {
  PositionHistory,
  PositionHistorySchema,
} from './entities/positionHistory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PositionHistory.name, schema: PositionHistorySchema },
      { name: SalaryHistory.name, schema: SalaryHistorySchema },
    ]),
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService, MongooseModule],
})
export class HistoryModule {}
