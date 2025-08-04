import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './entities/employee.schema';
import { Model } from 'mongoose';
import { SalaryHistory } from '../history/entities/salaryHistory.schema';
import { PositionHistory } from '../history/entities/positionHistory.schema';
import { Position } from '../position/entities/position.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private readonly EmployeeRepo: Model<Employee>,
    @InjectModel(SalaryHistory.name)
    private readonly SalaryHistoryRepo: Model<SalaryHistory>,
    @InjectModel(PositionHistory.name)
    private readonly positionHistoryRepo: Model<PositionHistory>,
  ) {}

  async create(employee: CreateEmployeeDto) {
    const created = await this.EmployeeRepo.create({
      ...employee,
    });
    console.log(created);
  }

  async findOne(id: string) {
    const employee = await this.EmployeeRepo.findById(id);
    if (!employee) throw new NotFoundException('employee not found');
    return employee;
  }

  async updateEmployeeSalary(id: string, salary: number) {
    return this.EmployeeRepo.findByIdAndUpdate(id, { salary });
  }

  async updateEmployeePosition(id: string, position: Position) {
    return this.EmployeeRepo.findByIdAndUpdate(id, { position });
  }
}
