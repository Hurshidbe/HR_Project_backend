import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDepartmentDto } from './dto/department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name) private departmentRepo: Model<Department>,
  ) {}

  create(dto: CreateDepartmentDto) {
    return this.departmentRepo.create(dto);
  }

  findAll() {
    return this.departmentRepo.find();
  }

  findOne(id: string) {
    return this.departmentRepo.findById(id);
  }

  async update(id: string, dto: CreateDepartmentDto) {
    const updated = await this.departmentRepo.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Department not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.departmentRepo.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Department not found');
    return deleted;
  }
}
