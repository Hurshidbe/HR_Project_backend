import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './entities/employee.schema';
import { Model } from 'mongoose';
import { SalaryHistory } from '../history/entities/salaryHistory.schema';
import { PositionHistory } from '../history/entities/positionHistory.schema';
import { Position } from '../position/entities/position.entity';
import { EmployeeStatusEnum } from 'src/enums/enums';

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
  }

  async findOne(id: string) {
    const employee = await this.EmployeeRepo.findById(id)
      .populate('department', 'name description')
      .populate('position', 'title description');
    if (!employee) throw new NotFoundException('employee not found');
    return employee;
  }

  async updateEmployeeSalary(id: string, salary: number) {
    await this.EmployeeRepo.findByIdAndUpdate(id, { salary }, { new: true });

    return this.EmployeeRepo.findById(id)
      .populate('department', 'name description')
      .populate('position', 'title description');
  }

  async updateEmployeeStatus(id: string, status: EmployeeStatusEnum) {
    await this.EmployeeRepo.findByIdAndUpdate(
      id,
      { employeeStatus: status },
      { new: true },
    );

    return this.EmployeeRepo.findById(id)
      .populate('department', 'name description')
      .populate('position', 'title description');
  }

  async updateEmployeePosition(id: string, position: Position) {
    const positionId = (position as any)._id || position;

    const updateResult = await this.EmployeeRepo.findByIdAndUpdate(
      id,
      { position: positionId },
      { new: true },
    );

    return this.EmployeeRepo.findById(id)
      .populate('department', 'name description')
      .populate('position', 'title description');
  }

  async updateEmployeeDepartment(id: string, departmentId: string) {
    const updateResult = await this.EmployeeRepo.findByIdAndUpdate(
      id,
      { department: departmentId },
      { new: true },
    );

    return this.EmployeeRepo.findById(id)
      .populate('department', 'name description')
      .populate('position', 'title description');
  }

  async findAll(filter) {
    return this.EmployeeRepo.find(filter)
      .populate('department', 'name description')
      .populate('position', 'title description');
  }

  async getAllEmployees() {
    return this.EmployeeRepo.find()
      .populate('department', 'name description')
      .populate('position', 'title description');
  }
}
