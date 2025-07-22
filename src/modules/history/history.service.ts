import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SalaryHistory } from './entities/salaryHistory.schema';
import { Model } from 'mongoose';
import { PositionHistory } from './entities/positionHistory.schema';
import { Position } from '../position/entities/position.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(SalaryHistory.name)
    private readonly salaryHistoryRepo: Model<SalaryHistory>,
    @InjectModel(PositionHistory.name)
    private readonly positionHistoryRepo: Model<PositionHistory>,
  ) {}

  async createForSalaryRepo(
    employeeId: string,
    oldSalary: number,
    newSalary: number,
  ) {
    return this.salaryHistoryRepo.create({
      employee: employeeId,
      newSalary,
      oldSalary,
    });
  }

  async createForPositionRepo(
    employee: string,
    newPosition: Position,
    oldPosition: Position,
  ) {
    return this.positionHistoryRepo.create({
      employee,
      newPosition,
      oldPosition,
    });
  }
}
